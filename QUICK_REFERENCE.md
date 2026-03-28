# Quick Reference Card

## 🎯 One-Page Overview

### Core Concept
**Behavior-aware learning system that tracks authenticity and adapts plans dynamically.**

---

## 🔑 Key Features (30-Second Pitch)

1. **Multi-Signal Tracking** - Time + Interaction + Reflection + Patterns
2. **Hard Enforcement** - Can't complete if time < 30% or reflection too short
3. **Trust Score** - 0-100 behavioral authenticity rating
4. **Focus Score** - Per-session quality metric
5. **Adaptive Plans** - Auto-reschedule missed tasks, recovery plans
6. **Predictive Analytics** - Failure prediction based on velocity
7. **Weak Area Detection** - Identifies struggling topics
8. **Credibility Panel** - Real-time authenticity dashboard

---

## 📊 Trust Score Formula

```
Starting: 100 points

Adjustments per session:
+ Time > 80% target: +10
+ Time > 50% target: +5
+ Interactions > 10: +5
+ Reflection > 40 chars: +5

- Interactions < 3: -15
- Tab switches: -5 each
- Reflection < 20 chars: -5
- Time < 30% target: -15 + BLOCK

Final: Clamped to 0-100
```

---

## 🎨 Risk Levels

| Trust Score | Risk Level | Color | Streak Counts? |
|-------------|------------|-------|----------------|
| 80-100      | Low        | Green | ✅ Yes         |
| 50-79       | Medium     | Yellow| ✅ Yes         |
| 0-49        | High       | Red   | ❌ No          |

---

## 🔒 Enforcement Rules

| Rule | Trigger | Action |
|------|---------|--------|
| Minimum Time | Time < 30% target | Block + Alert + -15 trust |
| Instant Completion | Time < 10 seconds | Heavy penalty |
| Poor Reflection | < 30 characters | Block submission |
| Tab Switching | Leave page | -5 trust per switch |
| Low Interaction | < 3 clicks/types | -15 trust |

---

## 📈 Focus Score Calculation

```
Start: 100

Penalties:
- Time < 50% target: -20
- Time < 80% target: -10
- Interactions < 3: -30
- Interactions < 10: -15
- Each tab switch: -20
- Reflection < 30 chars: -15

Result: 0-100 (clamped)
```

---

## 🎭 Demo Flow (5 min)

1. **Intro** (30s) - Explain behavior-aware concept
2. **Generate Plan** (1m) - Show AI planning
3. **Show Credibility Panel** (1m) - Highlight WOW feature
4. **Fake Attempt** (1m) - Try to cheat → blocked
5. **Real Session** (1.5m) - Complete properly → rewarded
6. **Advanced Features** (1m) - Recovery, weak areas, prediction

---

## 💡 Key Talking Points

### Problem
"Students fail because they can't stay consistent, not because they can't plan."

### Solution
"Multi-signal behavioral tracking that estimates learning authenticity."

### Differentiation
"We don't just track time—we track time quality, interaction, reflection, and patterns."

### Value Prop
"Trust but verify. Genuine learning over checkbox completion."

---

## 🎨 Visual Highlights

- ✨ Animated trust score with pulse effect
- 🎨 Color-coded risk levels (Green/Yellow/Red)
- 📊 Real-time progress bars
- 🔔 Dynamic insight messages
- 🎯 Focus score badges
- ⚡ Smooth transitions everywhere

---

## 🚀 Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview build (localhost:4173)
```

---

## 📁 Key Files

```
src/
├── App.jsx                      # Main logic & state
├── components/Dashboard/
│   ├── ProgressWidgets.jsx     # Credibility panel ⭐
│   ├── Timer.jsx                # Session tracking
│   ├── DailyTasks.jsx           # Task list
│   ├── QuickValidationModal.jsx # Reflection check
│   └── SessionSummaryModal.jsx  # Post-session feedback
└── services/
    ├── mockAi.js                # Plan generation
    └── storage.js               # localStorage utils
```

---

## 🐛 Quick Fixes

### Reset Everything
```javascript
localStorage.clear();
location.reload();
```

### Check Trust Score
```javascript
JSON.parse(localStorage.getItem('ai_coach_stats')).trustScore
```

### Force Trust to 100
```javascript
const stats = JSON.parse(localStorage.getItem('ai_coach_stats'));
stats.trustScore = 100;
localStorage.setItem('ai_coach_stats', JSON.stringify(stats));
location.reload();
```

---

## 📊 Metrics Tracked

### Per Session
- Duration (seconds)
- Tab switches (count)
- Interactions (count)
- Focus score (0-100)
- Reflection text

### Overall
- Trust score (0-100)
- Current streak (days)
- Consistency score (0-100)
- Tasks completed/assigned
- Historical data array

---

## 🎯 Judge Questions - Quick Answers

**"How do you prevent gaming?"**
→ Multi-layered: time minimum, interaction tracking, reflection validation, tab detection

**"What's different from time trackers?"**
→ We track time quality + interaction + reflection + patterns, not just duration

**"Can this scale?"**
→ Yes, lightweight rules, localStorage now, easy backend integration

**"What about false positives?"**
→ Multiple signals + thresholds, patterns matter more than single events

**"Business model?"**
→ Freemium: basic free, premium (analytics, teams, integrations) paid

---

## ✅ Feature Checklist

- ✅ Multi-signal tracking (5 signals)
- ✅ Hard enforcement (4 rules)
- ✅ Trust score (0-100)
- ✅ Focus score (per session)
- ✅ Credibility panel (animated)
- ✅ Session summary (modal)
- ✅ Weak area detection
- ✅ Recovery plan generator
- ✅ Failure prediction
- ✅ Adaptive rescheduling
- ✅ Behavioral insights
- ✅ Polished UI/UX

---

## 🎬 Demo Tips

### DO
- ✅ Show credibility panel first (WOW factor)
- ✅ Demonstrate enforcement (try to cheat)
- ✅ Complete one real session
- ✅ Highlight animations and feedback
- ✅ Explain multi-signal approach

### DON'T
- ❌ Rush through credibility panel
- ❌ Skip enforcement demo
- ❌ Forget to show session summary
- ❌ Miss tab switching detection
- ❌ Overlook trust score changes

---

## 📞 Support

- **README.md** - Full documentation
- **DEMO_GUIDE.md** - Detailed demo script
- **FEATURES_SUMMARY.md** - Complete feature list
- **TROUBLESHOOTING.md** - Common issues

---

## 🏆 Success Criteria

✅ Build completes without errors
✅ All enforcement rules work
✅ Trust score updates correctly
✅ Animations are smooth
✅ UI is polished and professional
✅ Demo flows naturally
✅ System is hard to game

---

**Print this page for quick reference during demos!** 📄
