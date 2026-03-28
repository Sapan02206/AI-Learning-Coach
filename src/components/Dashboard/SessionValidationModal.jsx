import { useState } from 'react';
import { CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function SessionValidationModal({ task, sessionData, onSubmit, onCancel }) {
    const [topicsStudied, setTopicsStudied] = useState('');
    const [timeEstimate, setTimeEstimate] = useState('');
    const [reflection, setReflection] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSubmit = async () => {
        setIsAnalyzing(true);
        
        // Simulate "Analyzing session..." delay (psychological effect)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Validate responses
        const actualMinutes = Math.floor(sessionData.seconds / 60);
        const estimatedMinutes = parseInt(timeEstimate) || 0;
        const timeDifference = Math.abs(actualMinutes - estimatedMinutes);
        
        // Detect unrealistic answers
        let validationPenalty = 0;
        let validationWarnings = [];
        
        if (timeDifference > actualMinutes * 0.5) {
            validationPenalty += 10;
            validationWarnings.push('Time estimate significantly off');
        }
        
        if (topicsStudied.trim().length < 10) {
            validationPenalty += 15;
            validationWarnings.push('Topics description too brief');
        }
        
        if (reflection.trim().length < 30) {
            validationPenalty += 10;
            validationWarnings.push('Reflection too short');
        }
        
        onSubmit({
            topicsStudied,
            timeEstimate: estimatedMinutes,
            reflection,
            validationPenalty,
            validationWarnings
        });
    };

    const minLength = 30;
    const charCount = reflection.trim().length;
    const isValid = topicsStudied.trim().length >= 10 && timeEstimate && charCount >= minLength;

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
            <div className="glass-panel" style={{
                padding: '2.5rem',
                maxWidth: '600px',
                width: '90%',
                border: '1px solid var(--accent-primary)',
                background: 'var(--bg-card)'
            }}>
                {isAnalyzing ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <div className="shimmer" style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 auto 1.5rem',
                            borderRadius: '50%',
                            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.6) 50%, rgba(59, 130, 246, 0.2) 100%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s infinite'
                        }} />
                        <h2 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Analyzing Session...</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Validating behavioral signals and responses</p>
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px' }}>
                                <CheckCircle2 size={28} color="var(--accent-primary)" />
                            </div>
                            <div>
                                <h2 style={{ margin: 0, color: 'var(--accent-primary)', fontSize: '1.5rem' }}>Session Validation</h2>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verify your study session details</p>
                            </div>
                        </div>

                        <div style={{
                            padding: '1rem',
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid var(--accent-primary)',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <Clock size={20} color="var(--accent-primary)" />
                            <div>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Session Duration</p>
                                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                                    {Math.floor(sessionData.seconds / 60)} minutes {sessionData.seconds % 60} seconds
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '600' }}>
                                    Which topics did you study? <span style={{ color: 'var(--danger)' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={topicsStudied}
                                    onChange={(e) => setTopicsStudied(e.target.value)}
                                    placeholder="e.g., Binary search trees, recursion patterns..."
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: topicsStudied.trim().length >= 10 ? '1px solid var(--accent-secondary)' : '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontSize: '0.95rem'
                                    }}
                                />
                                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: topicsStudied.trim().length >= 10 ? 'var(--accent-secondary)' : 'var(--text-muted)' }}>
                                    {topicsStudied.trim().length >= 10 ? '✓ Good' : `Need ${10 - topicsStudied.trim().length} more characters`}
                                </p>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '600' }}>
                                    Approximately how many minutes did you spend? <span style={{ color: 'var(--danger)' }}>*</span>
                                </label>
                                <input
                                    type="number"
                                    value={timeEstimate}
                                    onChange={(e) => setTimeEstimate(e.target.value)}
                                    placeholder="Enter minutes..."
                                    min="1"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: timeEstimate ? '1px solid var(--accent-secondary)' : '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontSize: '0.95rem'
                                    }}
                                />
                                {timeEstimate && (
                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        Actual: {Math.floor(sessionData.seconds / 60)} mins • Your estimate: {timeEstimate} mins
                                    </p>
                                )}
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: '600' }}>
                                    What did you learn? (Reflection) <span style={{ color: 'var(--danger)' }}>*</span>
                                </label>
                                <textarea
                                    value={reflection}
                                    onChange={(e) => setReflection(e.target.value)}
                                    placeholder="Describe your key takeaways and insights..."
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        padding: '0.75rem',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: charCount >= minLength ? '1px solid var(--accent-secondary)' : '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontSize: '0.95rem',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: charCount >= minLength ? 'var(--accent-secondary)' : 'var(--warning)' }}>
                                    {charCount} / {minLength} characters {charCount >= minLength ? '✓' : ''}
                                </p>
                            </div>
                        </div>

                        <div style={{
                            padding: '1rem',
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid var(--warning)',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            gap: '0.75rem'
                        }}>
                            <AlertTriangle size={20} color="var(--warning)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                                Your responses will be validated against session data. Unrealistic answers will reduce your trust score.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={onCancel}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-muted)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!isValid}
                                style={{
                                    flex: 2,
                                    padding: '1rem',
                                    background: isValid ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                    color: isValid ? 'white' : 'rgba(255,255,255,0.3)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    cursor: isValid ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <CheckCircle2 size={18} />
                                {isValid ? 'Submit & Analyze' : 'Complete all fields...'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
