import { useState, useEffect } from 'react';
import { Flame, Target, Trophy, ShieldAlert, ShieldCheck, Activity } from 'lucide-react';

const AnimatedNumber = ({ value }) => {
    const [display, setDisplay] = useState(value);

    useEffect(() => {
        let start = display;
        const end = value;
        if (start === end) return;

        const duration = 800;
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setDisplay(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setDisplay(end);
            }
        };
        window.requestAnimationFrame(step);
    }, [value]);

    return <>{display}</>;
};

export default function ProgressWidgets({ stats, lastTrustChange = 0 }) {
    const trustScore = stats.trustScore ?? 100;
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    // Animate pulse on trust score change
    const [pulseClass, setPulseClass] = useState('');
    useEffect(() => {
        setPulseClass('pulse-animation');
        const timer = setTimeout(() => setPulseClass(''), 600);
        return () => clearTimeout(timer);
    }, [trustScore]);
    
    // Show feedback message on trust change
    useEffect(() => {
        if (lastTrustChange !== 0) {
            if (lastTrustChange > 10) {
                setFeedbackMessage('🔥 Strong consistency detected!');
            } else if (lastTrustChange > 0) {
                setFeedbackMessage('✓ Good progress!');
            } else if (lastTrustChange < -10) {
                setFeedbackMessage('⚠️ Low engagement detected');
            } else if (lastTrustChange < 0) {
                setFeedbackMessage('⚠️ Trust decreased');
            }
            
            setShowFeedback(true);
            const timer = setTimeout(() => setShowFeedback(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [lastTrustChange]);

    // Calculate Risk
    let riskLevel = 'Low';
    let riskColor = 'var(--accent-secondary)'; // Green
    if (trustScore <= 50) {
        riskLevel = 'High';
        riskColor = 'var(--danger)'; // Red
    } else if (trustScore < 80) {
        riskLevel = 'Medium';
        riskColor = 'var(--warning)'; // Yellow
    }

    // Calculate Engagement (From recent history)
    const recentHistory = (stats.history || []).slice(-5);
    const avgInteractions = recentHistory.length > 0
        ? recentHistory.reduce((acc, h) => acc + (h.interactions || 0), 0) / recentHistory.length
        : 5; // Default medium

    let engagementLevel = 'Medium';
    if (avgInteractions >= 10) engagementLevel = 'High';
    else if (avgInteractions < 3) engagementLevel = 'Low';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>

            {/* LEARNING CREDIBILITY PANEL (WOW FEATURE) */}
            <div className={`glass-panel ${pulseClass}`} style={{ padding: '2rem', border: `1px solid ${riskColor}`, background: `linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.98) 100%)`, position: 'relative', overflow: 'hidden', transition: 'border-color 0.5s ease' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: riskColor, transition: 'background 0.5s ease' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: riskColor, transition: 'color 0.5s ease' }}>
                                {riskLevel === 'High' ? <ShieldAlert size={36} /> : <ShieldCheck size={36} />}
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', margin: 0, fontWeight: '700', letterSpacing: '-0.5px' }}>Learning Credibility</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Behavioral Authenticity Engine</p>
                            </div>
                        </div>
                        <div style={{ marginTop: '1.5rem', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', borderLeft: `3px solid ${riskColor}`, transition: 'border-color 0.5s ease' }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Activity size={16} color={riskColor} />
                                <span style={{ color: 'var(--text-muted)' }}>System confidence:</span>
                                <strong style={{ color: riskColor }}><AnimatedNumber value={trustScore} />%</strong>
                                <span style={{ color: 'var(--text-muted)' }}>that learning is genuine.</span>
                            </p>
                        </div>
                        
                        {/* Feedback Message */}
                        {showFeedback && (
                            <div className="fade-in" style={{
                                marginTop: '1rem',
                                padding: '0.75rem 1rem',
                                background: lastTrustChange > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                border: `1px solid ${lastTrustChange > 0 ? 'var(--accent-secondary)' : 'var(--danger)'}`,
                                borderRadius: '8px',
                                color: lastTrustChange > 0 ? 'var(--accent-secondary)' : 'var(--danger)',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                textAlign: 'center'
                            }}>
                                {feedbackMessage}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', minWidth: '120px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '1px' }}>Authentic</p>
                            <p style={{ fontSize: '2.5rem', fontWeight: '800', color: riskColor, margin: 0, lineHeight: 1, transition: 'color 0.5s ease' }}><AnimatedNumber value={trustScore} />%</p>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', minWidth: '120px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '1px' }}>Engagement</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '0.5rem', color: engagementLevel === 'High' ? 'var(--accent-secondary)' : engagementLevel === 'Low' ? 'var(--danger)' : 'var(--warning)', transition: 'color 0.5s ease' }}>{engagementLevel}</p>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', minWidth: '120px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '1px' }}>Risk Level</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '0.5rem', color: riskColor, transition: 'color 0.5s ease' }}>{riskLevel}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Flame size={20} color="var(--warning)" />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Streak</span>
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}><AnimatedNumber value={stats.currentStreak} /> <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>days</span></p>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Target size={20} color="var(--accent-primary)" />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Consistency</span>
                    </div>
                    <div style={{ width: '100%' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}><AnimatedNumber value={stats.consistencyScore} />%</p>
                        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '0.25rem', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${stats.consistencyScore}%`, background: 'var(--accent-primary)', transition: 'width 0.5s ease-out' }}></div>
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Trophy size={20} color="var(--accent-secondary)" />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tasks Done</span>
                    </div>
                    <div>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}><AnimatedNumber value={stats.totalTasksCompleted} /><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/{stats.totalTasksAssigned}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
