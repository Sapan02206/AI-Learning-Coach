import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, Square, Clock, CheckSquare, Square as SquareIcon, AlertTriangle, EyeOff, Activity } from 'lucide-react';
import PresenceCheckModal from './PresenceCheckModal';

export default function Timer({ activeTask, onStop }) {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [tabSwitches, setTabSwitches] = useState(0);
    const [interactions, setInteractions] = useState(0);
    const [localSubtasks, setLocalSubtasks] = useState(() => activeTask?.subtasks || []);
    
    // Anti-cheat features
    const [showPresenceCheck, setShowPresenceCheck] = useState(false);
    const [presenceChecksPassed, setPresenceChecksPassed] = useState(0);
    const [presenceChecksFailed, setPresenceChecksFailed] = useState(0);
    const [inactiveSeconds, setInactiveSeconds] = useState(0);
    const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
    const [warnings, setWarnings] = useState([]);
    const [confidenceDecay, setConfidenceDecay] = useState(0);
    
    const nextPresenceCheckRef = useRef(null);
    const inactivityTimerRef = useRef(null);

    // Sync if activeTask changes unexpectedly
    useEffect(() => {
        setLocalSubtasks(activeTask?.subtasks || []);
        setSeconds(0);
        setTabSwitches(0);
        setInteractions(0);
        setIsActive(false);
        setPresenceChecksPassed(0);
        setPresenceChecksFailed(0);
        setInactiveSeconds(0);
        setWarnings([]);
        setConfidenceDecay(0);
        setLastInteractionTime(Date.now());
    }, [activeTask?.id]);

    // Track Tab Visibility (Signal: Inactivity/Background)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && isActive) {
                setTabSwitches(prev => prev + 1);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [isActive]);

    // Track Time & Schedule Presence Checks
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
            
            // Schedule random presence check (3-6 minutes)
            const schedulePresenceCheck = () => {
                const randomDelay = (180 + Math.random() * 180) * 1000; // 3-6 minutes
                nextPresenceCheckRef.current = setTimeout(() => {
                    setShowPresenceCheck(true);
                    setIsActive(false); // Pause timer during check
                }, randomDelay);
            };
            
            if (!nextPresenceCheckRef.current) {
                schedulePresenceCheck();
            }
        } else {
            clearInterval(interval);
            if (nextPresenceCheckRef.current) {
                clearTimeout(nextPresenceCheckRef.current);
                nextPresenceCheckRef.current = null;
            }
        }
        return () => {
            clearInterval(interval);
            if (nextPresenceCheckRef.current) {
                clearTimeout(nextPresenceCheckRef.current);
            }
        };
    }, [isActive]);
    
    // Inactivity Detection (2-3 minutes without interaction)
    useEffect(() => {
        if (!isActive) return;
        
        inactivityTimerRef.current = setInterval(() => {
            const timeSinceLastInteraction = Date.now() - lastInteractionTime;
            const inactiveMinutes = Math.floor(timeSinceLastInteraction / 60000);
            
            if (timeSinceLastInteraction > 120000) { // 2 minutes
                setInactiveSeconds(prev => prev + 1);
                setConfidenceDecay(prev => prev + 0.5);
                
                if (inactiveMinutes >= 2 && !warnings.includes('inactive')) {
                    setWarnings(prev => [...prev, 'inactive']);
                }
            }
        }, 1000);
        
        return () => {
            if (inactivityTimerRef.current) {
                clearInterval(inactivityTimerRef.current);
            }
        };
    }, [isActive, lastInteractionTime, warnings]);

    if (!activeTask) return null;

    const handleStop = () => {
        setIsActive(false);
        onStop({
            seconds,
            tabSwitches,
            interactions,
            completedSubtasks: localSubtasks,
            presenceChecksPassed,
            presenceChecksFailed,
            inactiveSeconds,
            confidenceDecay,
            warnings: warnings.length
        });
    };
    
    const handlePresenceCheckRespond = (answer) => {
        setShowPresenceCheck(false);
        setPresenceChecksPassed(prev => prev + 1);
        setIsActive(true); // Resume timer
        nextPresenceCheckRef.current = null; // Reset for next check
    };
    
    const handlePresenceCheckTimeout = () => {
        setShowPresenceCheck(false);
        setPresenceChecksFailed(prev => prev + 1);
        setConfidenceDecay(prev => prev + 20); // Heavy penalty
        setWarnings(prev => [...prev, 'presence-failed']);
        setIsActive(true); // Resume timer but with penalty
        nextPresenceCheckRef.current = null;
    };

    const formatTime = (totalSeconds) => {
        const min = Math.floor(totalSeconds / 60);
        const sec = totalSeconds % 60;
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const handleTrackInteraction = () => {
        if (isActive) {
            setInteractions(prev => prev + 1);
            setLastInteractionTime(Date.now());
            
            // Clear inactive warning if user becomes active again
            if (warnings.includes('inactive')) {
                setWarnings(prev => prev.filter(w => w !== 'inactive'));
            }
        }
    };

    const toggleSubtask = (id) => {
        handleTrackInteraction();
        
        // Progressive Task Unlocking: Check if previous subtasks are completed
        const currentIndex = localSubtasks.findIndex(s => s.id === id);
        if (currentIndex > 0) {
            const previousCompleted = localSubtasks.slice(0, currentIndex).every(s => s.isCompleted);
            if (!previousCompleted) {
                setWarnings(prev => [...prev, 'unlock-order']);
                setTimeout(() => {
                    setWarnings(prev => prev.filter(w => w !== 'unlock-order'));
                }, 3000);
                return; // Don't allow toggle
            }
        }
        
        setLocalSubtasks(prev => prev.map(s => s.id === id ? { ...s, isCompleted: !s.isCompleted } : s));
    };

    return (
        <>
            {showPresenceCheck && (
                <PresenceCheckModal
                    subtasks={localSubtasks}
                    onRespond={handlePresenceCheckRespond}
                    onTimeout={handlePresenceCheckTimeout}
                />
            )}
            
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid var(--accent-primary)', background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 41, 59, 0.8) 100%)' }} onClick={handleTrackInteraction}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                        <Clock size={20} color="var(--accent-primary)" /> {activeTask.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Target: {activeTask.durationMins} mins • Stay focused! Activity is being monitored.</p>

                    {/* Subtasks inside the session */}
                    {localSubtasks.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Session Tasks</h4>
                            {localSubtasks.map(sub => (
                                <div
                                    key={sub.id}
                                    onClick={() => toggleSubtask(sub.id)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}
                                >
                                    <div>
                                        {sub.isCompleted ? <CheckSquare size={18} color="var(--accent-secondary)" /> : <SquareIcon size={18} color="var(--text-muted)" />}
                                    </div>
                                    <span style={{ fontSize: '0.95rem', color: sub.isCompleted ? 'var(--text-muted)' : 'var(--text-main)', textDecoration: sub.isCompleted ? 'line-through' : 'none' }}>
                                        {sub.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <textarea
                        placeholder="Type your notes or scratchpad here to stay active..."
                        onChange={handleTrackInteraction}
                        style={{ width: '100%', height: '80px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.75rem', color: 'white', fontFamily: 'inherit', resize: 'none' }}
                    />
                </div>

                <div style={{ textAlign: 'center', minWidth: '150px', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'monospace', textShadow: isActive ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none', color: isActive ? 'var(--text-main)' : 'var(--text-muted)' }}>
                        {formatTime(seconds)}
                    </div>

                    {/* Warnings Display */}
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {tabSwitches > 0 && (
                            <p style={{ color: 'var(--warning)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                <AlertTriangle size={12} /> Tab: {tabSwitches}x
                            </p>
                        )}
                        {warnings.includes('inactive') && (
                            <p style={{ color: 'var(--danger)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                <EyeOff size={12} /> Inactive detected
                            </p>
                        )}
                        {warnings.includes('presence-failed') && (
                            <p style={{ color: 'var(--danger)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                <AlertTriangle size={12} /> Check failed
                            </p>
                        )}
                        {warnings.includes('unlock-order') && (
                            <p style={{ color: 'var(--warning)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                <AlertTriangle size={12} /> Complete in order
                            </p>
                        )}
                        {presenceChecksPassed > 0 && (
                            <p style={{ color: 'var(--accent-secondary)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                <Activity size={12} /> Verified: {presenceChecksPassed}x
                            </p>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1rem' }}>
                        {!isActive ? (
                            <button onClick={() => setIsActive(true)} style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', transition: 'transform 0.1s' }}>
                                <Play size={24} />
                            </button>
                        ) : (
                            <button onClick={() => setIsActive(false)} style={{ background: 'var(--warning)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', transition: 'transform 0.1s' }}>
                                <Pause size={24} />
                            </button>
                        )}
                        <button onClick={handleStop} disabled={seconds === 0} style={{ background: seconds === 0 ? 'rgba(255,255,255,0.1)' : 'var(--danger)', color: seconds === 0 ? 'rgba(255,255,255,0.3)' : 'white', border: 'none', padding: '0.75rem', borderRadius: '50%', cursor: seconds === 0 ? 'not-allowed' : 'pointer' }}>
                            <Square size={24} />
                        </button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>Interactions: {interactions}</p>
                </div>
            </div>
            
            {/* Real-time Warning Banner */}
            {(warnings.includes('inactive') || inactiveSeconds > 120) && (
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid var(--danger)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    animation: 'pulse-glow 1s infinite'
                }}>
                    <EyeOff size={20} color="var(--danger)" />
                    <div>
                        <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--danger)' }}>⚠️ Session Appears Inactive</p>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            No interaction detected for {Math.floor(inactiveSeconds / 60)} minutes. Your trust score is decreasing.
                        </p>
                    </div>
                </div>
            )}
            </div>
        </>
    );
}
