import { isBefore, parseISO, format, addDays } from 'date-fns';

export function rescheduleMissedTasks(tasks, stats) {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');

    // Find missed tasks (date is before today, and status is still pending)
    const missedTasks = tasks.filter(t =>
        isBefore(parseISO(t.date), parseISO(todayStr)) && t.status === 'pending'
    );

    if (missedTasks.length === 0) return { newTasks: tasks, hasChanges: false, missedCount: 0, missedItems: [] };

    // Clone tasks
    let updatedTasks = [...tasks];

    // Find future buffer days
    const futureBufferDays = updatedTasks.filter(t =>
        !isBefore(parseISO(t.date), parseISO(todayStr)) && t.type === 'revision'
    );

    let bufferIndex = 0;

    updatedTasks = updatedTasks.map(task => {
        // If it's a missed task, we try to move it
        if (missedTasks.find(m => m.id === task.id)) {
            let targetDateStr = todayStr;

            // If we have future buffers, map it to the nearest buffer day instead of cramming today
            if (futureBufferDays.length > 0) {
                targetDateStr = futureBufferDays[bufferIndex % futureBufferDays.length].date;
                bufferIndex++;
            }

            return {
                ...task,
                date: targetDateStr,
                title: `[Rescheduled] ${task.title}`
            };
        }
        return task;
    });

    return { newTasks: updatedTasks, hasChanges: true, missedCount: missedTasks.length, missedItems: missedTasks };
}
