import { Target, Clock, Zap, CheckCircle2 } from 'lucide-react';

export default function SessionSummaryModal({ result, onClose }) {
    if (!result) return null;

    const { 
        title, 
        durationMins, 
        focusScore, 
        sessionSeconds, 
        insight,
        presenceChecksPassed = 0,
        presenceChecksFailed = 0,
        trustScoreChange = 0,
        validationWarnings = [],
        completionPercentage = null
    } = result;

    const formatMinSec = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}m ${s}s`;
    };

    let scoreColor = 'var(--accent-secondary)'; // Green
    if (focusScore < 50) scoreColor = 'var(--danger)';
    else if (focusScore < 80) scoreColor = 'var(--warning)';

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
            <div className="pulse-animation glass-panel" style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '16px', maxWidth: '400px', width: '100%', border: `1px solid ${scoreColor}`, textAlign: 'center' }}>

                <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', color: scoreColor, marginBottom: '1.5rem' }}>
                    {focusScore >= 80 ? <Target size={48} /> : focusScore >= 50 ? <Clock size={48} /> : <Zap size={48} />}
                </div>

                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Session Complete</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{title}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Time Spent</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formatMinSec(sessionSeconds)}</p>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', borderBottom: `3px solid ${scoreColor}` }}>
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Focus Score</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: scoreColor }}>{focusScore}%</p>
                    </div>
                    {completionPercentage !== null && (
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', borderBottom: '3px solid var(--accent-primary)' }}>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Completed</p>
                            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{completionPercentage}%</p>
                        </div>
                    )}
                    {presenceChecksPassed > 0 && (
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', borderBottom: '3px solid var(--accent-secondary)' }}>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Verified</p>
                            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-secondary)' }}>{presenceChecksPassed}x ✓</p>
                        </div>
                    )}
                    {presenceChecksFailed > 0 && (
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', borderBottom: '3px solid var(--danger)' }}>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Missed Checks</p>
                            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--danger)' }}>{presenceChecksFailed}x</p>
                        </div>
                    )}
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', borderBottom: `3px solid ${trustScoreChange >= 0 ? 'var(--accent-secondary)' : 'var(--danger)'}` }}>
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Trust Change</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: trustScoreChange >= 0 ? 'var(--accent-secondary)' : 'var(--danger)' }}>
                            {trustScoreChange >= 0 ? '+' : ''}{trustScoreChange}
                        </p>
                    </div>
                </div>

                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: `4px solid ${scoreColor}`, textAlign: 'left', marginBottom: '2rem' }}>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>{insight}</p>
                    {validationWarnings.length > 0 && (
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--warning)' }}>
                            ⚠️ {validationWarnings.length} validation issue(s) detected
                        </p>
                    )}
                </div>

                <button
                    onClick={onClose}
                    style={{ width: '100%', padding: '1rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                    <CheckCircle2 size={20} /> Continue to Dashboard
                </button>
            </div>
        </div>
    );
}
