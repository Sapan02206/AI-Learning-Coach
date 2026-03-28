import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Play, Square, Activity, Eye, AlertTriangle } from 'lucide-react';

export default function LinkLearningSession({ onSessionComplete }) {
    const [learningLink, setLearningLink] = useState('');
    const [topicName, setTopicName] = useState('');
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [tabSwitches, setTabSwitches] = useState(0);
    const [interactions, setInteractions] = useState(0);
    const [inactiveSeconds, setInactiveSeconds] = useState(0);
    const [warnings, setWarnings] = useState(0);
    const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

    const timerRef = useRef(null);
    const inactivityRef = useRef(null);

    // Track tab visibility changes
    useEffect(() => {
        if (!isSessionActive) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setTabSwitches(prev => prev + 1);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [isSessionActive]);

    // Track elapsed time
    useEffect(() => {
        if (!isSessionActive) return;

        timerRef.current = setInterval(() => {
            setElapsedSeconds(prev => prev + 1);
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isSessionActive]);

    // Track inactivity
    useEffect(() => {
        if (!isSessionActive) return;

        inactivityRef.current = setInterval(() => {
            const timeSinceLastInteraction = Date.now() - lastInteractionTime;
            
            if (timeSinceLastInteraction > 120000) { // 2 minutes
                setInactiveSeconds(prev => prev + 1);
                
                if (timeSinceLastInteraction > 180000) { // 3 minutes
                    setWarnings(prev => prev + 1);
                }
            }
        }, 1000);

        return () => {
            if (inactivityRef.current) clearInterval(inactivityRef.current);
        };
    }, [isSessionActive, lastInteractionTime]);

    const handleStartSession = () => {
        if (!learningLink.trim()) {
            alert('Please enter a learning link');
            return;
        }

        setIsSessionActive(true);
        setElapsedSeconds(0);
        setTabSwitches(0);
        setInteractions(0);
        setInactiveSeconds(0);
        setWarnings(0);
        setLastInteractionTime(Date.now());

        // Open link in new tab
        window.open(learningLink, '_blank');
    };

    const handleEndSession = () => {
        setIsSessionActive(false);
        
        onSessionComplete({
            link: learningLink,
            topic: topicName || 'External Learning',
            startTime: new Date().toISOString(),
            elapsedSeconds,
            tabSwitches,
            interactions,
            inactiveSeconds,
            warnings
        });

        // Reset
        setLearningLink('');
        setTopicName('');
    };

    const handleInteraction = () => {
        if (isSessionActive) {
            setInteractions(prev => prev + 1);
            setLastInteractionTime(Date.now());
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <ExternalLink size={20} color="var(--accent-primary)" />
                <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>
                    Link-Based Learning Session
                </h3>
            </div>

            {!isSessionActive ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            Learning Link (YouTube, Coursera, etc.)
                        </label>
                        <input
                            type="url"
                            value={learningLink}
                            onChange={(e) => setLearningLink(e.target.value)}
                            placeholder="https://youtube.com/watch?v=..."
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '0.9rem'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            Topic Name (Optional)
                        </label>
                        <input
                            type="text"
                            value={topicName}
                            onChange={(e) => setTopicName(e.target.value)}
                            placeholder="e.g., React Hooks Tutorial"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '0.9rem'
                            }}
                        />
                    </div>

                    <button
                        onClick={handleStartSession}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'var(--accent-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Play size={18} />
                        Start Learning Session
                    </button>

                    <div style={{
                        padding: '0.75rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid var(--accent-primary)',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)'
                    }}>
                        💡 We track your behavior during learning (time, interaction, tab switches), not platform activity.
                    </div>
                </div>
            ) : (
                <div onClick={handleInteraction} style={{ cursor: 'pointer' }}>
                    <div style={{
                        padding: '1.5rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '2px solid var(--accent-primary)',
                        borderRadius: '12px',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Session</p>
                                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                                    {topicName || 'External Learning'}
                                </p>
                            </div>
                            <div style={{
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                fontFamily: 'monospace',
                                color: 'var(--accent-primary)'
                            }}>
                                {formatTime(elapsedSeconds)}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <Activity size={14} color="var(--accent-secondary)" />
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interactions</span>
                                </div>
                                <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>{interactions}</p>
                            </div>

                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <Eye size={14} color={tabSwitches > 0 ? 'var(--warning)' : 'var(--accent-secondary)'} />
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tab Switches</span>
                                </div>
                                <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: tabSwitches > 0 ? 'var(--warning)' : 'inherit' }}>
                                    {tabSwitches}
                                </p>
                            </div>

                            {inactiveSeconds > 120 && (
                                <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--danger)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <AlertTriangle size={14} color="var(--danger)" />
                                        <span style={{ fontSize: '0.75rem', color: 'var(--danger)' }}>Inactive</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--danger)' }}>
                                        {Math.floor(inactiveSeconds / 60)}m
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {warnings > 0 && (
                        <div className="pulse-animation" style={{
                            padding: '0.75rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid var(--danger)',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <AlertTriangle size={16} color="var(--danger)" />
                            <span style={{ fontSize: '0.85rem', color: 'var(--danger)', fontWeight: 'bold' }}>
                                ⚠️ Low activity detected - Click here to stay engaged
                            </span>
                        </div>
                    )}

                    <button
                        onClick={handleEndSession}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'var(--danger)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Square size={18} />
                        End Learning Session
                    </button>

                    <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                        💡 Click anywhere in this area to register interaction
                    </p>
                </div>
            )}
        </div>
    );
}
