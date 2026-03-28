import { Brain, Shield } from 'lucide-react';

export default function Layout({ children }) {
    return (
        <div className="layout">
            <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{ 
                        padding: '0.75rem', 
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)', 
                        borderRadius: '12px',
                        border: '1px solid rgba(59, 130, 246, 0.3)'
                    }}>
                        <Brain size={32} color="var(--accent-primary)" />
                    </div>
                    <h1 style={{ fontWeight: '700', letterSpacing: '-1px', fontSize: '2.5rem', margin: 0 }}>
                        <span style={{ color: 'var(--accent-primary)' }}>AI</span> Learning Coach
                    </h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <Shield size={16} color="var(--accent-secondary)" />
                    <p style={{ margin: 0 }}>Behavior-Aware • Authenticity Tracking • Adaptive Planning</p>
                </div>
            </header>
            <main className="glass-panel fade-in" style={{ padding: '2rem', minHeight: '60vh' }}>
                {children}
            </main>
            <footer style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <p>Powered by behavioral intelligence • Not just planning, but genuine learning</p>
            </footer>
        </div>
    );
}
