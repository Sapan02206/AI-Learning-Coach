import { useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function QuickValidationModal({ task, onSubmit, onCancel }) {
    const [answer, setAnswer] = useState('');
    const minLength = 30; // Enforce minimum 30 characters for meaningful reflection

    const wordCount = answer.trim().split(/\s+/).filter(w => w.length > 0).length;
    const charCount = answer.trim().length;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
            backdropFilter: 'blur(8px)'
        }}>
            <div className="glass-panel" style={{ padding: '2.5rem', maxWidth: '550px', width: '90%', animation: 'fadeIn 0.3s', border: '1px solid var(--accent-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px' }}>
                        <CheckCircle2 size={28} color="var(--accent-primary)" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, color: 'var(--accent-primary)', fontSize: '1.5rem' }}>Session Validation</h2>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Behavioral authenticity check</p>
                    </div>
                </div>

                <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                    <AlertTriangle size={20} color="var(--warning)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        To verify genuine learning for <strong>"{task.title}"</strong>, describe what you studied in 2-3 meaningful sentences.
                    </p>
                </div>

                <textarea
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    placeholder="Example: I learned about the key differences between synchronous and asynchronous programming. The main takeaway was understanding how callbacks and promises help manage async operations..."
                    style={{
                        width: '100%', height: '140px', padding: '1rem', borderRadius: '8px',
                        background: 'rgba(0,0,0,0.3)', border: charCount >= minLength ? '1px solid var(--accent-secondary)' : '1px solid rgba(255,255,255,0.2)', 
                        color: 'white', marginBottom: '1rem',
                        resize: 'none', fontFamily: 'inherit', fontSize: '0.95rem', lineHeight: '1.6',
                        transition: 'border-color 0.3s ease'
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: charCount >= minLength ? 'var(--accent-secondary)' : 'var(--text-muted)' }}>
                        {wordCount} words • {charCount} characters
                    </span>
                    <span style={{ color: charCount >= minLength ? 'var(--accent-secondary)' : 'var(--warning)' }}>
                        {charCount >= minLength ? '✓ Ready to submit' : `Need ${minLength - charCount} more characters`}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onCancel}
                        style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSubmit(answer)}
                        disabled={charCount < minLength}
                        style={{ 
                            flex: 2, 
                            padding: '1rem', 
                            background: charCount >= minLength ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)', 
                            color: charCount >= minLength ? 'white' : 'rgba(255,255,255,0.3)', 
                            border: 'none', 
                            borderRadius: '8px', 
                            fontWeight: '600', 
                            cursor: charCount >= minLength ? 'pointer' : 'not-allowed',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <CheckCircle2 size={18} />
                        {charCount >= minLength ? 'Verify & Complete Session' : 'Write more to continue...'}
                    </button>
                </div>
            </div>
        </div>
    );
}
