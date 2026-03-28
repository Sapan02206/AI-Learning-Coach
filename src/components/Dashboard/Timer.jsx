import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Square, Clock, CheckSquare, Square as SquareIcon, AlertTriangle } from 'lucide-react';

export default function Timer({ activeTask, onStop }) {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [tabSwitches, setTabSwitches] = useState(0);
    const [interactions, setInteractions] = useState(0);
    const [localSubtasks, setLocalSubtasks] = useState(() => activeTask?.subtasks || []);

    // Sync if activeTask changes unexpectedly
    useEffect(() => {
        setLocalSubtasks(activeTask?.subtasks || []);
        setSeconds(0);
        setTabSwitches(0);
        setInteractions(0);
        setIsActive(false);
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

    // Track Time
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    if (!activeTask) return null;

    const handleStop = () => {
        setIsActive(false);
        onStop({
            seconds,
            tabSwitches,
            interactions,
            completedSubtasks: localSubtasks
        });
    };

    const formatTime = (totalSeconds) => {
        const min = Math.floor(totalSeconds / 60);
        const sec = totalSeconds % 60;
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const handleTrackInteraction = () => {
        if (isActive) setInteractions(prev => prev + 1);
    };

    const toggleSubtask = (id) => {
        handleTrackInteraction();
        setLocalSubtasks(prev => prev.map(s => s.id === id ? { ...s, isCompleted: !s.isCompleted } : s));
    };

    return (
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

                    {tabSwitches > 0 && (
                        <p style={{ color: 'var(--warning)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                            <AlertTriangle size={14} /> Tab switched {tabSwitches}x
                        </p>
                    )}

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
        </div>
    );
}
