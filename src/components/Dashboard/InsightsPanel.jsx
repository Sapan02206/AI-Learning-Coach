import { Sparkles } from 'lucide-react';

export default function InsightsPanel({ message }) {
    if (!message) return null;

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent-primary)', background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(30, 41, 59, 0.7) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Sparkles color="var(--accent-primary)" style={{ marginTop: '0.25rem' }} />
                <div>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>AI Coach Insight</h4>
                    <p style={{ lineHeight: '1.6' }}>{message}</p>
                </div>
            </div>
        </div>
    );
}
