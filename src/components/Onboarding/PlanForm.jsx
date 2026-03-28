import { useState } from 'react';

export default function PlanForm({ onGenerate }) {
    const [subject, setSubject] = useState('');
    const [deadline, setDeadline] = useState('');
    const [dailyMinutes, setDailyMinutes] = useState(60);
    const [difficulty, setDifficulty] = useState('medium');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await onGenerate({
            subject,
            deadline,
            dailyMinutes: parseInt(dailyMinutes, 10),
            difficulty
        });

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Let's build your plan</h2>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>What subject do you want to learn?</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Data Structures & Algorithms"
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>When is your goal deadline?</label>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', colorScheme: 'dark' }}
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Daily Mins</label>
                    <input
                        type="number"
                        value={dailyMinutes}
                        onChange={(e) => setDailyMinutes(e.target.value)}
                        min="10"
                        max="480"
                        required
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Intensity</label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                    >
                        <option value="easy">Easy (More breaks)</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard (Fewer breaks)</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'var(--accent-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: isLoading ? 'wait' : 'pointer',
                    transition: 'background 0.2s',
                    opacity: isLoading ? 0.7 : 1
                }}
            >
                {isLoading ? 'Generating AI Plan...' : 'Generate Study Plan'}
            </button>
        </form>
    );
}
