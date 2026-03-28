import { useState, useEffect } from 'react';
import { AlertCircle, Clock } from 'lucide-react';

export default function PresenceCheckModal({ subtasks, onRespond, onTimeout }) {
    const [timeLeft, setTimeLeft] = useState(20);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [customAnswer, setCustomAnswer] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onTimeout]);

    const handleSubmit = () => {
        const answer = selectedAnswer === 'custom' ? customAnswer : selectedAnswer;
        if (answer.trim()) {
            onRespond(answer);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            animation: 'fadeIn 0.3s'
        }}>
            <div className="glass-panel pulse-animation" style={{
                padding: '2.5rem',
                maxWidth: '500px',
                width: '90%',
                border: '2px solid var(--warning)',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(30, 41, 59, 0.95) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '12px' }}>
                        <AlertCircle size={32} color="var(--warning)" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, color: 'var(--warning)', fontSize: '1.5rem' }}>Active Presence Check</h2>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verify you're actively studying</p>
                    </div>
                    <div style={{
                        padding: '0.5rem 1rem',
                        background: timeLeft <= 5 ? 'var(--danger)' : 'rgba(245, 158, 11, 0.2)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        animation: timeLeft <= 5 ? 'pulse-glow 0.5s infinite' : 'none'
                    }}>
                        <Clock size={18} color={timeLeft <= 5 ? 'white' : 'var(--warning)'} />
                        <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: timeLeft <= 5 ? 'white' : 'var(--warning)' }}>
                            {timeLeft}s
                        </span>
                    </div>
                </div>

                <div style={{
                    padding: '1rem',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid var(--warning)',
                    borderRadius: '8px',
                    marginBottom: '1.5rem'
                }}>
                    <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)', fontWeight: '600' }}>
                        What are you currently studying?
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {subtasks.map(sub => (
                        <label
                            key={sub.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem',
                                background: selectedAnswer === sub.title ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                                border: selectedAnswer === sub.title ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <input
                                type="radio"
                                name="presence"
                                value={sub.title}
                                checked={selectedAnswer === sub.title}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                style={{ cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '0.95rem' }}>{sub.title}</span>
                        </label>
                    ))}

                    <label
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            background: selectedAnswer === 'custom' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                            border: selectedAnswer === 'custom' ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <input
                            type="radio"
                            name="presence"
                            value="custom"
                            checked={selectedAnswer === 'custom'}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                            style={{ cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.95rem' }}>Other (specify below)</span>
                    </label>

                    {selectedAnswer === 'custom' && (
                        <input
                            type="text"
                            value={customAnswer}
                            onChange={(e) => setCustomAnswer(e.target.value)}
                            placeholder="What are you studying right now?"
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--accent-primary)',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '0.95rem'
                            }}
                        />
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer || (selectedAnswer === 'custom' && !customAnswer.trim())}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: (!selectedAnswer || (selectedAnswer === 'custom' && !customAnswer.trim())) ? 'rgba(255,255,255,0.1)' : 'var(--accent-primary)',
                        color: (!selectedAnswer || (selectedAnswer === 'custom' && !customAnswer.trim())) ? 'rgba(255,255,255,0.3)' : 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: (!selectedAnswer || (selectedAnswer === 'custom' && !customAnswer.trim())) ? 'not-allowed' : 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Confirm I'm Studying
                </button>

                <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    ⚠️ Ignoring this check will reduce your trust score
                </p>
            </div>
        </div>
    );
}
