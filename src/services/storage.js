export const PLAN_KEY = 'ai_coach_plan';
export const TASKS_KEY = 'ai_coach_tasks';
export const STATS_KEY = 'ai_coach_stats';

const DEFAULT_STATS = {
    currentStreak: 0,
    longestStreak: 0,
    consistencyScore: 100,
    totalTasksCompleted: 0,
    totalTasksAssigned: 0,
    trustScore: 100, // New field for Authenticity Tracker
    history: []
};

export function savePlan(plan) {
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

export function getPlan() {
    const data = localStorage.getItem(PLAN_KEY);
    return data ? JSON.parse(data) : null;
}

export function saveTasks(tasks) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function getTasks() {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
}

export function getStats() {
    const data = localStorage.getItem(STATS_KEY);
    return data ? JSON.parse(data) : DEFAULT_STATS;
}

export function saveStats(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function clearAll() {
    localStorage.removeItem(PLAN_KEY);
    localStorage.removeItem(TASKS_KEY);
    localStorage.removeItem(STATS_KEY);
}
