import { TrendingUp, TrendingDown, Clock, Zap, Target, AlertCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function BehavioralInsights({ stats, history }) {
    // 1. Best Study Time Detection
    const getBestStudyTime = () => {
        if (!history || history.length < 3) return null;

        try {
            const timeSlots = {};
            history.forEach(h => {
                if (h.timestamp) {
                    const hour = new Date(h.timestamp).getHours();
                    const slot = hour < 12 ? 'Morning (6-12)' : hour < 17 ? 'Afternoon (12-5)' : 'Evening (5-11)';
                    
                    if (!timeSlots[slot]) {
                        timeSlots[slot] = { count: 0, totalFocus: 0 };
                    }
                    timeSlots[slot].count++;
                    timeSlots[slot].totalFocus += (h.focusScore || 70);
                }
            });

            let bestSlot = null;
            let bestAvg = 0;

            Object.entries(timeSlots).forEach(([slot, data]) => {
                const avg = data.totalFocus / data.count;
                if (avg > bestAvg) {
                    bestAvg = avg;
                    bestSlot = slot;
                }
            });

            return bestSlot ? { slot: bestSlot, score: Math.round(bestAvg) } : null;
        } catch (error) {
            console.error('Error calculating best study time:', error);
            return null;
        }
    };

    // 2. Streak Quality
    const getStreakQuality = () => {
        if (!stats.currentStreak || stats.currentStreak === 0) return null;

        const recentHistory = (history || []).slice(-stats.currentStreak);
        if (recentHistory.length === 0) return null;

        const avgFocus = recentHistory.reduce((sum, h) => sum + (h.focusScore || 70), 0) / recentHistory.length;
        const avgTrust = stats.trustScore || 70;
        const quality = (avgFocus + avgTrust) / 2;

        return Math.round(quality);
    };

    // 3. Consistency Trend
    const getConsistencyTrend = () => {
        if (!history || history.length < 4) return null;

        const recent = history.slice(-4);
        const older = history.slice(-8, -4);

        if (older.length === 0) return null;

        const recentAvg = recent.reduce((sum, h) => sum + (h.focusScore || 70), 0) / recent.length;
        const olderAvg = older.reduce((sum, h) => sum + (h.focusScore || 70), 0) / older.length;

        const diff = recentAvg - olderAvg;

        if (diff > 5) return { direction: 'up', value: Math.round(diff) };
        if (diff < -5) return { direction: 'down', value: Math.round(Math.abs(diff)) };
        return { direction: 'stable', value: 0 };
    };

    // 4. Last Session Snapshot
    const getLastSession = () => {
        if (!history || history.length === 0) return null;

        const last = history[history.length - 1];
        const duration = last.timeRatio ? (last.timeRatio * 60) : 0; // Approximate
        const focusScore = last.focusScore || 0;
        const engagement = focusScore >= 80 ? 'High' : focusScore >= 50 ? 'Medium' : 'Low';

        return {
            duration: duration.toFixed(1),
            focusScore,
            engagement,
            date: last.date
        };
    };

    // 5. Missed Day Recovery
    const getMissedDayRecovery = () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');

        const yesterdayData = (history || []).find(h => h.date === yesterday);
        const todayData = (history || []).find(h => h.date === today);

        if (!yesterdayData && !todayData) {
            return { missed: true, recoveryMinutes: 20 };
        }

        return null;
    };

    const bestTime = getBestStudyTime();
    const streakQuality = getStreakQuality();
    const trend = getConsistencyTrend();
    const lastSession = getLastSession();
    const missedRecovery = getMissedDayRecovery();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Best Study Time */}
            {bestTime && (
                <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--accent-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Clock size={20} color="var(--accent-primary)" />
                        <div>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Best Study Time</p>
                            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                                You perform best in the {bestTime.slot}
                            </p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--accent-secondary)' }}>
                                Avg Focus: {bestTime.score}%
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Streak Quality */}
            {streakQuality !== null && stats.currentStreak > 0 && (
                <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--accent-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Zap size={20} color="var(--accent-secondary)" />
                        <div>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Streak Quality</p>
                            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                                {stats.currentStreak}-day streak (Quality: {streakQuality}%)
                            </p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: streakQuality >= 75 ? 'var(--accent-secondary)' : streakQuality >= 50 ? 'var(--warning)' : 'var(--danger)' }}>
                                {streakQuality >= 75 ? '🔥 Excellent quality!' : streakQuality >= 50 ? '👍 Good quality' : '⚠️ Needs improvement'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Consistency Trend */}
            {trend && (
                <div className="glass-panel" style={{ padding: '1rem', borderLeft: `4px solid ${trend.direction === 'up' ? 'var(--accent-secondary)' : trend.direction === 'down' ? 'var(--danger)' : 'var(--warning)'}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {trend.direction === 'up' ? (
                            <TrendingUp size={20} color="var(--accent-secondary)" />
                        ) : trend.direction === 'down' ? (
                            <TrendingDown size={20} color="var(--danger)" />
                        ) : (
                            <Target size={20} color="var(--warning)" />
                        )}
                        <div>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Consistency Trend</p>
                            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                                {trend.direction === 'up' ? 'Consistency improving ↑' : trend.direction === 'down' ? 'Consistency declining ↓' : 'Consistency stable →'}
                            </p>
                            {trend.value > 0 && (
                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {trend.direction === 'up' ? '+' : '-'}{trend.value}% vs last week
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Last Session Snapshot */}
            {lastSession && (
                <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--accent-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Zap size={20} color="var(--accent-primary)" />
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Last Session</p>
                            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                                {lastSession.duration} hrs | Focus: {lastSession.focusScore}% | {lastSession.engagement} engagement
                            </p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {lastSession.date}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Missed Day Recovery */}
            {missedRecovery && (
                <div className="glass-panel pulse-animation" style={{ padding: '1rem', borderLeft: '4px solid var(--warning)', background: 'rgba(245, 158, 11, 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <AlertCircle size={20} color="var(--warning)" />
                        <div>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Recovery Needed</p>
                            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: 'var(--warning)' }}>
                                You missed yesterday. Add {missedRecovery.recoveryMinutes} minutes today to recover.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
