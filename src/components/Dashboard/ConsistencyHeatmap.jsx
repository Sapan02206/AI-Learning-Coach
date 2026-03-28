import { format, subDays, startOfDay } from 'date-fns';
import { Calendar } from 'lucide-react';

export default function ConsistencyHeatmap({ history, days = 14 }) {
    // Generate last N days
    const today = startOfDay(new Date());
    const dateRange = Array.from({ length: days }, (_, i) => {
        return format(subDays(today, days - 1 - i), 'yyyy-MM-dd');
    });

    // Map history to dates with error handling
    const historyMap = {};
    try {
        (history || []).forEach(h => {
            if (h && h.date) {
                historyMap[h.date] = h;
            }
        });
    } catch (error) {
        console.error('Error processing history:', error);
    }

    // Calculate color for each day
    const getColor = (date) => {
        const dayData = historyMap[date];
        
        if (!dayData) {
            // No data - check if it's a future date
            if (new Date(date) > today) {
                return 'rgba(255,255,255,0.05)'; // Future
            }
            return 'rgba(239, 68, 68, 0.3)'; // Missed (red)
        }

        if (dayData.status === 'completed') {
            // Calculate quality based on trust and focus
            const quality = ((dayData.focusScore || 70) + (dayData.trustScore || 70)) / 2;
            
            if (quality >= 75) {
                return 'var(--accent-secondary)'; // Green - excellent
            } else if (quality >= 50) {
                return 'var(--warning)'; // Yellow - partial
            } else {
                return 'rgba(239, 68, 68, 0.6)'; // Red - poor quality
            }
        }

        return 'rgba(239, 68, 68, 0.3)'; // Missed
    };

    const getLabel = (date) => {
        const dayData = historyMap[date];
        
        if (!dayData) {
            if (new Date(date) > today) return 'Future';
            return 'Missed';
        }

        if (dayData.status === 'completed') {
            const quality = ((dayData.focusScore || 70) + (dayData.trustScore || 70)) / 2;
            return `${Math.round(quality)}%`;
        }

        return 'Missed';
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Calendar size={20} color="var(--accent-primary)" />
                <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>Consistency Heatmap</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(days, 7)}, 1fr)`, gap: '0.5rem', marginBottom: '1rem' }}>
                {dateRange.map((date, idx) => {
                    const dayOfWeek = format(new Date(date), 'EEE');
                    const dayOfMonth = format(new Date(date), 'd');
                    const color = getColor(date);
                    const label = getLabel(date);

                    return (
                        <div
                            key={date}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}
                        >
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                                {dayOfWeek}
                            </span>
                            <div
                                style={{
                                    width: '100%',
                                    aspectRatio: '1',
                                    background: color,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    color: color === 'rgba(255,255,255,0.05)' ? 'var(--text-muted)' : 'white',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }}
                                title={`${date}: ${label}`}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {dayOfMonth}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', background: 'var(--accent-secondary)', borderRadius: '3px' }}></div>
                    <span>Excellent</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', background: 'var(--warning)', borderRadius: '3px' }}></div>
                    <span>Partial</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', background: 'rgba(239, 68, 68, 0.6)', borderRadius: '3px' }}></div>
                    <span>Missed</span>
                </div>
            </div>
        </div>
    );
}
