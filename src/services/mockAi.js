import { format, addDays, differenceInDays } from 'date-fns';

export const generateStudyPlan = (details) => {
    const { subject, deadline, dailyMinutes, difficulty } = details;
    const days = differenceInDays(new Date(deadline), new Date()) + 1;
    const tasks = [];

    // Simulate Smart Plan generation mapping
    for (let i = 0; i < days; i++) {
        const currentDate = format(addDays(new Date(), i), 'yyyy-MM-dd');

        // Break 60 mins into two 30 min tasks, etc
        const numTasks = Math.max(1, Math.floor(dailyMinutes / 30));

        for (let j = 0; j < numTasks; j++) {
            tasks.push({
                id: `task-${i}-${j}-${Date.now()}`,
                date: currentDate,
                title: `${subject} Module ${i + 1}.${j + 1}`,
                durationMins: Math.floor(dailyMinutes / numTasks),
                status: 'pending',
                subtasks: [
                    { id: `s1-${i}-${j}`, title: 'Review core concepts', isCompleted: false },
                    { id: `s2-${i}-${j}`, title: 'Complete practice exercise', isCompleted: false },
                    { id: `s3-${i}-${j}`, title: 'Write summary notes', isCompleted: false }
                ]
            });
        }
    }

    return tasks;
};

// V6/V7 Behavior Aware Nudges
export const generateInsights = (stats, todayHistory = null) => {
    const { consistencyScore, currentStreak, trustScore } = stats;

    if (trustScore < 50) return "⚠️ Low engagement detected. Increase interaction to improve credibility.";
    if (trustScore < 80) return "👀 Tab switching detected. Stay focused to maintain Trust Score.";
    if (consistencyScore < 50) return "📉 Inconsistent pattern detected. Let's start with one micro-task today.";
    if (currentStreak > 3) return "🔥 Strong consistency detected. System confidence increasing.";

    return "Great job keeping up with your schedule!";
};
