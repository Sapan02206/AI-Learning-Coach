import { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import Layout from './components/Layout/Layout';
import PlanForm from './components/Onboarding/PlanForm';
import ProgressWidgets from './components/Dashboard/ProgressWidgets';
import DailyTasks from './components/Dashboard/DailyTasks';
import InsightsPanel from './components/Dashboard/InsightsPanel';
import Timer from './components/Dashboard/Timer';
import ConsistencyHeatmap from './components/Dashboard/ConsistencyHeatmap';
import BehavioralInsights from './components/Dashboard/BehavioralInsights';
import SessionValidationModal from './components/Dashboard/SessionValidationModal';
import SessionSummaryModal from './components/Dashboard/SessionSummaryModal';
import { generateStudyPlan, generateInsights } from './services/mockAi';
import { savePlan, getPlan, saveTasks, getTasks, saveStats, getStats, clearAll } from './services/storage';

export default function App() {
    const [plan, setPlan] = useState(() => getPlan());
    const [tasks, setTasks] = useState(() => getTasks());
    const [stats, setStats] = useState(() => getStats());
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [validatingTask, setValidatingTask] = useState(null);
    const [sessionSeconds, setSessionSeconds] = useState(0);
    const [sessionResult, setSessionResult] = useState(null);
    const [insight, setInsight] = useState("");
    const [lastTrustChange, setLastTrustChange] = useState(0);

    // On mount and once per day start: check for missed tasks
    useEffect(() => {
        if (!plan) return;
        const todayStr = format(new Date(), 'yyyy-MM-dd');

        // Simple Missed Task Logic
        let updatedTasks = [...tasks];
        let changed = false;
        updatedTasks.forEach(t => {
            if (new Date(t.date) < new Date(todayStr) && t.status === 'pending') {
                t.date = todayStr; // Push to today
                changed = true;
            }
        });

        if (changed) {
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
        }

    }, [plan?.createdAt]);

    const handlePlanGenerate = (details) => {
        const newTasks = generateStudyPlan(details);
        const newPlan = { 
            ...details, 
            topic: details.subject, // Add topic field for dashboard display
            createdAt: new Date().toISOString() 
        };

        const newStats = {
            totalTasksAssigned: newTasks.length,
            totalTasksCompleted: 0,
            currentStreak: 0,
            longestStreak: 0,
            consistencyScore: 100,
            trustScore: 100,
            history: []
        };

        setPlan(newPlan);
        setTasks(newTasks);
        setStats(newStats);

        savePlan(newPlan);
        saveTasks(newTasks);
        saveStats(newStats);

        setInsight("Plan generated successfully! Let's get started on day one.");
    };

    const handleToggleTask = (taskId, status, externalStats = null, externalRatio = null, sessionMetrics = null, customTasksState = null) => {
        const stateTasks = customTasksState || tasks;
        const updatedTasks = stateTasks.map(t => t.id === taskId ? { ...t, status } : t);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);

        const newStats = externalStats || { ...stats };

        if (status === 'completed') {
            newStats.totalTasksCompleted += 1;

            const todayStr = format(new Date(), 'yyyy-MM-dd');
            const todaysTasksList = updatedTasks.filter(t => t.date === todayStr);
            const allDoneToday = todaysTasksList.every(t => t.status === 'completed');
            const todayDayOfWeek = format(new Date(), 'EEEE');

            if (allDoneToday) {
                // Enforcement Rule: If trust score is too low, do NOT increase streak
                if ((newStats.trustScore ?? 100) >= 50) {
                    newStats.currentStreak += 1;
                    newStats.longestStreak = Math.max(newStats.longestStreak, newStats.currentStreak);
                }

                // Log successful day
                newStats.history.push({
                    date: todayStr,
                    dayOfWeek: todayDayOfWeek,
                    status: 'completed',
                    timeRatio: externalRatio,
                    interactions: sessionMetrics?.interactions || 0,
                    tabSwitches: sessionMetrics?.tabSwitches || 0,
                    focusScore: sessionMetrics?.focusScore || 70,
                    trustScore: newStats.trustScore,
                    topic: sessionMetrics?.topic,
                    timestamp: new Date().toISOString()
                });
            }
        }

        setStats(newStats);
        saveStats(newStats);

        const newInsight = generateInsights(newStats, newStats.history);
        setInsight(newInsight);
    };

    const handleStartSession = (task) => {
        setActiveTaskId(task.id);
    };

    const handleStopTimer = (sessionData) => {
        const { 
            seconds, 
            tabSwitches, 
            interactions, 
            completedSubtasks,
            presenceChecksPassed = 0,
            presenceChecksFailed = 0,
            inactiveSeconds = 0,
            confidenceDecay = 0,
            warnings = 0
        } = sessionData;

        const task = tasks.find(t => t.id === activeTaskId);
        const targetSeconds = task.durationMins * 60;

        // Enforcement Rule: Do NOT allow task completion if time spent < 30% of expected
        const minThreshold = targetSeconds * 0.3;
        if (seconds < minThreshold && seconds < 600) { // minimum 10 mins or 30% to bypass
            let newStats = { ...stats };
            newStats.trustScore = Math.max(0, (newStats.trustScore || 100) - 15);
            setStats(newStats);
            saveTasks(tasks);
            saveStats(newStats);
            alert(`Too fast! You must study for at least 30% of the target time (${Math.ceil(minThreshold / 60)} mins) to formally complete this task. Your authenticity score took a hit.`);

            setSessionSeconds(0);
            setActiveTaskId(null);
            return;
        }

        setSessionSeconds(seconds);
        setValidatingTask({ 
            ...task, 
            sessionMetadata: {
                ...sessionData,
                presenceChecksPassed,
                presenceChecksFailed,
                inactiveSeconds,
                confidenceDecay,
                warnings
            }
        });
        setActiveTaskId(null);
    };

    const handleValidationSubmit = (validationData) => {
        const task = validatingTask;
        const { 
            seconds, 
            tabSwitches, 
            interactions, 
            completedSubtasks,
            presenceChecksPassed = 0,
            presenceChecksFailed = 0,
            inactiveSeconds = 0,
            confidenceDecay = 0,
            warnings = 0
        } = task.sessionMetadata;
        
        const {
            topicsStudied = '',
            timeEstimate = 0,
            reflection = '',
            validationPenalty = 0,
            validationWarnings = []
        } = validationData;

        let newStats = { ...stats };
        if (!newStats.trustScore) newStats.trustScore = 100;

        // Enhanced Trust Algorithm with Anti-Cheat Signals
        let trustShift = 0;

        // 1. Time Quality
        const targetSeconds = task.durationMins * 60;
        if (seconds > targetSeconds * 0.8) trustShift += 10;
        else if (seconds > targetSeconds * 0.5) trustShift += 5;

        // 2. Interaction Level
        if (interactions < 3) trustShift -= 15;
        else if (interactions > 10) trustShift += 5;

        // 3. Tab Switching Penalty
        if (tabSwitches > 0) trustShift -= (tabSwitches * 5);

        // 4. Reflection Quality
        if (reflection.trim().length > 40) trustShift += 5;
        else if (reflection.trim().length < 20) trustShift -= 5;
        
        // 5. Presence Check Performance (NEW)
        if (presenceChecksPassed > 0) trustShift += (presenceChecksPassed * 8);
        if (presenceChecksFailed > 0) trustShift -= (presenceChecksFailed * 20);
        
        // 6. Inactivity Penalty (NEW)
        const inactiveMinutes = Math.floor(inactiveSeconds / 60);
        if (inactiveMinutes > 2) trustShift -= (inactiveMinutes * 3);
        
        // 7. Confidence Decay (NEW)
        trustShift -= confidenceDecay;
        
        // 8. Session Validation Penalty (NEW)
        trustShift -= validationPenalty;
        
        // 9. Warning Penalties (NEW)
        trustShift -= (warnings * 5);

        newStats.trustScore = Math.min(100, Math.max(0, newStats.trustScore + trustShift));
        
        // Behavior Pattern Detection
        if (!newStats.behaviorPatterns) newStats.behaviorPatterns = [];
        
        const sessionPattern = {
            duration: seconds,
            interactions,
            tabSwitches,
            presenceChecksPassed,
            presenceChecksFailed,
            inactiveMinutes,
            timestamp: Date.now()
        };
        
        newStats.behaviorPatterns.push(sessionPattern);
        
        // Keep only last 10 sessions for pattern analysis
        if (newStats.behaviorPatterns.length > 10) {
            newStats.behaviorPatterns = newStats.behaviorPatterns.slice(-10);
        }
        
        // Detect Suspicious Patterns
        let suspiciousPatternDetected = false;
        let patternWarning = '';
        
        if (newStats.behaviorPatterns.length >= 3) {
            const recentPatterns = newStats.behaviorPatterns.slice(-3);
            
            // Same exact duration repeatedly
            const durations = recentPatterns.map(p => p.duration);
            const allSame = durations.every(d => Math.abs(d - durations[0]) < 10);
            if (allSame) {
                suspiciousPatternDetected = true;
                patternWarning = '⚠️ Unusual activity pattern detected: Identical session durations';
                trustShift -= 10;
            }
            
            // Perfect streak with no variation
            const avgInteractions = recentPatterns.reduce((sum, p) => sum + p.interactions, 0) / recentPatterns.length;
            if (avgInteractions < 2) {
                suspiciousPatternDetected = true;
                patternWarning = '⚠️ Unusual activity pattern detected: Consistently low interaction';
                trustShift -= 15;
            }
            
            // Multiple presence check failures
            const totalFailed = recentPatterns.reduce((sum, p) => sum + p.presenceChecksFailed, 0);
            if (totalFailed >= 2) {
                suspiciousPatternDetected = true;
                patternWarning = '⚠️ Unusual activity pattern detected: Multiple presence check failures';
                trustShift -= 20;
            }
        }
        
        // Apply final trust score after pattern detection
        const finalTrustShift = trustShift + (suspiciousPatternDetected ? -10 : 0);
        newStats.trustScore = Math.min(100, Math.max(0, newStats.trustScore + finalTrustShift));
        
        // Track trust change for visual feedback
        setLastTrustChange(finalTrustShift);

        // Auto-complete all subtasks immutably
        let updatedTasksForToggle = tasks.map(t => {
            if (t.id === task.id && t.subtasks) {
                const upSub = t.subtasks.map(s => ({ ...s, isCompleted: true }));
                return { ...t, subtasks: upSub };
            }
            return t;
        });

        const ratio = seconds / targetSeconds;

        // Calculate Enhanced Focus Score
        let focusScore = 100;
        if (seconds < targetSeconds * 0.5) focusScore -= 20;
        else if (seconds < targetSeconds * 0.8) focusScore -= 10;

        if (interactions < 3) focusScore -= 30;
        else if (interactions < 10) focusScore -= 15;

        if (tabSwitches > 0) focusScore -= (tabSwitches * 20);
        if (reflection.trim().length < 30) focusScore -= 15;
        
        // New penalties
        if (presenceChecksFailed > 0) focusScore -= (presenceChecksFailed * 25);
        if (inactiveMinutes > 2) focusScore -= (inactiveMinutes * 5);
        if (validationPenalty > 0) focusScore -= validationPenalty;

        focusScore = Math.max(0, Math.min(100, focusScore));

        let sessionInsight = '';
        if (focusScore >= 80) sessionInsight = "🔥 Excellent session! High interaction and solid focus.";
        else if (focusScore >= 50) sessionInsight = "👍 Good session, but try taking more notes or switching tabs less.";
        else sessionInsight = "⚠️ Low engagement detected. Poor time ratio or heavy tab switching.";
        
        if (suspiciousPatternDetected) {
            sessionInsight = patternWarning;
        }
        
        if (validationWarnings.length > 0) {
            sessionInsight += ` Validation issues: ${validationWarnings.join(', ')}`;
        }

        // Bypass implicit penalty by passing newStats directly
        handleToggleTask(task.id, 'completed', newStats, ratio, {
            interactions,
            tabSwitches,
            focusScore,
            topic: task.title,
            presenceChecksPassed,
            presenceChecksFailed,
            inactiveMinutes,
            validationWarnings: validationWarnings.length
        }, updatedTasksForToggle);

        setValidatingTask(null);
        setSessionSeconds(0);

        // Trigger WOW Modal
        setSessionResult({
            title: task.title,
            durationMins: task.durationMins,
            sessionSeconds: seconds,
            focusScore,
            insight: sessionInsight,
            presenceChecksPassed,
            presenceChecksFailed,
            trustScoreChange: trustShift,
            validationWarnings
        });
    };

    const handleReset = () => {
        clearAll();
        window.location.reload();
    };

    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const todaysTasks = tasks.filter(t => t.date === todayStr);
    const activeTaskObj = tasks.find(t => t.id === activeTaskId);

    let failurePrediction = null;
    if (plan && stats.totalTasksCompleted > 0) {
        const createdAt = new Date(plan.createdAt);
        const deadline = new Date(plan.deadline);
        const today = new Date();

        const totalDaysIntended = Math.max(1, Math.ceil((deadline - createdAt) / (1000 * 60 * 60 * 24)));
        const daysElapsed = Math.max(1, Math.ceil((today - createdAt) / (1000 * 60 * 60 * 24)));

        const currentVelocity = stats.totalTasksCompleted / daysElapsed;
        const projectedTotal = currentVelocity * totalDaysIntended;
        const totalTasksInPlan = tasks.length;

        if (projectedTotal < totalTasksInPlan) {
            const projectedPercent = Math.round((projectedTotal / totalTasksInPlan) * 100);
            failurePrediction = `Predictive Alert: At your current pace, you may complete only ${projectedPercent}% of your syllabus before the deadline.`;
        }
    }

    // Hackathon Feature: Weak Area Analytics
    const weakAreas = [];
    if (stats.history && stats.history.length > 0) {
        const topicScores = {};
        stats.history.forEach(h => {
            if (h.topic && h.focusScore !== undefined) {
                if (!topicScores[h.topic]) topicScores[h.topic] = [];
                topicScores[h.topic].push(h.focusScore);
            }
        });

        for (const [topic, scores] of Object.entries(topicScores)) {
            const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
            if (avg < 60) {
                weakAreas.push({ topic, avg: Math.round(avg) });
            }
        }
    }

    // Hackathon Feature: Recovery Plan Alert
    const needsRecovery = failurePrediction !== null || (stats.totalTasksAssigned > 4 && (stats.totalTasksCompleted / stats.totalTasksAssigned) < 0.6);

    const handleActivateRecovery = () => {
        let updatedTasks = [...tasks];
        // Increase duration by 30 mins for tasks in the next 3 days
        const targetDates = [
            format(new Date(), 'yyyy-MM-dd'),
            format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'),
            format(new Date(Date.now() + 172800000), 'yyyy-MM-dd')
        ];

        let loadIncreased = false;
        updatedTasks.forEach(t => {
            if (targetDates.includes(t.date) && t.status === 'pending') {
                t.durationMins += 30;
                loadIncreased = true;
            }
        });

        if (loadIncreased) {
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
            setInsight("✅ Recovery Plan Activated! I've forcefully added +30 minutes to your load for the next 3 days.");
        } else {
            setInsight("⚠️ No pending tasks found in the next 3 days to expand.");
        }
    };

    return (
        <Layout>
            {!plan ? (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>AI Learning Consistency Coach</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Generate a behavior-aware study plan to ensure you genuinely cross the finish line.</p>
                    </div>
                    <PlanForm onGenerate={handlePlanGenerate} />
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ color: 'var(--text-main)', margin: 0 }}>Dashboard ({plan.topic})</h2>
                        <button
                            onClick={handleReset}
                            style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
                        >
                            Reset Plan
                        </button>
                    </div>

                    <ProgressWidgets stats={stats} lastTrustChange={lastTrustChange} />

                    {failurePrediction && (
                        <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.2rem' }}>⚠️</span> {failurePrediction}
                        </div>
                    )}

                    {needsRecovery && (
                        <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)', color: 'var(--warning)', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>🔄</span>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1rem' }}>Recovery Plan Required</h4>
                                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>You are falling behind your optimal pace. Activate Recovery to redistribute remaining tasks and explicitly add 30 minutes to your work for the next 3 days.</p>
                                </div>
                            </div>
                            <button
                                onClick={handleActivateRecovery}
                                className="pulse-animation"
                                style={{ background: 'var(--warning)', color: '#000', padding: '0.6rem 1.2rem', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Activate Recovery
                            </button>
                        </div>
                    )}

                    <InsightsPanel message={insight} />

                    {/* Visual Analytics Section */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <ConsistencyHeatmap history={stats.history} days={14} />
                        <BehavioralInsights stats={stats} history={stats.history} />
                    </div>

                    {weakAreas.length > 0 && (
                        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--danger)' }}>
                            <h3 style={{ fontSize: '1rem', color: 'var(--danger)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                🔻 Weak Areas Detected
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                {weakAreas.slice(0, 3).map((wa, idx) => (
                                    <div key={idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 'bold' }}>{wa.topic}</p>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--danger)' }}>Avg Focus: {wa.avg}%</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTaskId && (
                        <Timer activeTask={activeTaskObj} onStop={handleStopTimer} />
                    )}

                    {!activeTaskId && !validatingTask && (
                        <DailyTasks
                            tasks={todaysTasks}
                            stats={stats}
                            onToggleStatus={handleToggleTask}
                            onStartSession={handleStartSession}
                        />
                    )}
                </div>
            )}

            {validatingTask && (
                <SessionValidationModal
                    task={validatingTask}
                    sessionData={validatingTask.sessionMetadata}
                    onSubmit={handleValidationSubmit}
                    onCancel={() => setValidatingTask(null)}
                />
            )}

            {sessionResult && (
                <SessionSummaryModal
                    result={sessionResult}
                    onClose={() => setSessionResult(null)}
                />
            )}
        </Layout>
    );
}
