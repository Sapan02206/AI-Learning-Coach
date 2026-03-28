import { CheckSquare, Square, PlayCircle, CheckCircle2, Circle } from 'lucide-react';

export default function DailyTasks({ tasks, onToggleStatus, onStartSession, onToggleSubtask, activeTaskId }) {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Sweet! No tasks for today.</h3>
                <p style={{ color: 'var(--text-muted)' }}>Take a well-deserved break or review past material.</p>
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Today's Focus
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tasks.map(task => {
                    const isCompleted = task.status === 'completed';
                    const isActive = activeTaskId === task.id;

                    return (
                        <div
                            key={task.id}
                            style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: isCompleted ? 'rgba(16, 185, 129, 0.05)' : isActive ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                                border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : isActive ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255,255,255,0.1)'}`,
                                transition: 'all 0.2s ease-in-out',
                                opacity: isCompleted && !isActive ? 0.8 : 1
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div style={{ flex: 1, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    {/* Instant completion is NO LONGER allowed for pending tasks. Must use timer. */}
                                    <div
                                        onClick={() => isCompleted ? onToggleStatus(task.id, 'pending') : null}
                                        style={{ cursor: isCompleted ? 'pointer' : 'not-allowed', opacity: isCompleted ? 1 : 0.4 }}
                                        title={!isCompleted ? "You must complete this task via an active study session" : "Revoke completion"}
                                    >
                                        {isCompleted ? <CheckCircle2 color="var(--accent-secondary)" /> : <Circle color="var(--text-muted)" />}
                                    </div>
                                    <div>
                                        <p style={{
                                            fontWeight: '600', fontSize: '1.1rem',
                                            textDecoration: isCompleted ? 'line-through' : 'none',
                                            color: isCompleted ? 'var(--text-muted)' : 'var(--text-main)'
                                        }}>
                                            {task.title}
                                        </p>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            Target: {task.durationMins} mins • {task.type === 'revision' ? 'Revision' : 'Study'}
                                        </span>
                                    </div>
                                </div>

                                {!isCompleted && !isActive && (
                                    <button
                                        onClick={() => onStartSession(task)}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '20px', cursor: 'pointer', fontWeight: '500', fontSize: '0.85rem' }}
                                    >
                                        <PlayCircle size={16} /> Start
                                    </button>
                                )}
                                {isActive && (
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <PlayCircle size={16} /> In Progress
                                    </span>
                                )}
                            </div>

                            {/* Subtasks */}
                            {task.subtasks && task.subtasks.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '2.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    {task.subtasks.map(sub => (
                                        <div
                                            key={sub.id}
                                            onClick={() => onToggleSubtask && onToggleSubtask(task.id, sub.id)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}
                                        >
                                            <div>
                                                {sub.isCompleted ? <CheckSquare size={16} color="var(--accent-secondary)" /> : <Square size={16} color="var(--text-muted)" />}
                                            </div>
                                            <span style={{ fontSize: '0.9rem', color: sub.isCompleted ? 'var(--text-muted)' : 'var(--text-main)', textDecoration: sub.isCompleted ? 'line-through' : 'none', opacity: sub.isCompleted ? 0.7 : 1 }}>
                                                {sub.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
