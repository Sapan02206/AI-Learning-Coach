# Visual Analytics - Quick Start Guide

## 🚀 Immediate Testing

### Prerequisites
Server running at: **http://localhost:5175/**

---

## 🎯 5-Minute Demo

### Step 1: Create Plan & Complete First Session (2 min)
1. Generate a study plan
2. Start and complete one session properly
3. Fill validation form
4. **Result:** First data point created

### Step 2: View Visual Analytics (1 min)
Scroll down on dashboard to see:

**Consistency Heatmap:**
- 14-day calendar view
- First day shows green/yellow/red based on quality
- Hover over cells to see details

**Behavioral Insights:**
- Last Session snapshot appears
- Shows duration, focus score, engagement

### Step 3: Build More Data (5-10 min)
Complete 3-5 more sessions at different times:
- Morning session
- Afternoon session
- Evening session

**Watch insights appear:**
- ✅ Best Study Time (after 3+ sessions)
- ✅ Streak Quality (after streak starts)
- ✅ Consistency Trend (after 4+ sessions)

### Step 4: Test Recovery Message (1 min)
**Option A:** Wait until tomorrow and don't complete tasks
**Option B:** Manually test by checking code logic

**Result:** Recovery message appears:
"You missed yesterday. Add 20 minutes today to recover."

---

## 📊 What Each Feature Shows

### 1. Consistency Heatmap
```
Visual: 14-day calendar grid
Colors:
  🟢 Green = Excellent (75%+ quality)
  🟡 Yellow = Partial (50-74% quality)
  🔴 Red = Missed or poor (<50%)
  ⚪ Gray = Future days
```

### 2. Best Study Time
```
Shows: "You perform best in the Evening (5-11)"
Requires: 3+ sessions with timestamps
Logic: Compares avg focus across time slots
```

### 3. Streak Quality
```
Shows: "5-day streak (Quality: 72%)"
Formula: (avgFocusScore + trustScore) / 2
Indicator:
  🔥 75%+ = Excellent
  👍 50-74% = Good
  ⚠️ <50% = Needs improvement
```

### 4. Consistency Trend
```
Shows: "Consistency improving ↑" or "declining ↓"
Logic: Compares last 4 vs previous 4 sessions
Threshold: 5% difference to show trend
```

### 5. Last Session
```
Shows: "1.8 hrs | Focus: 68% | Medium engagement"
Engagement:
  High = 80%+ focus
  Medium = 50-79% focus
  Low = <50% focus
```

### 6. Recovery Message
```
Shows: "You missed yesterday. Add 20 minutes today to recover."
Triggers: When yesterday has no completion
Action: Suggests +20 minutes
```

---

## 🎨 Visual Layout

```
Dashboard
├── Progress Widgets (Trust, Streak, etc.)
├── Insights Panel
├── [NEW] Visual Analytics Grid
│   ├── Left: Consistency Heatmap
│   └── Right: Behavioral Insights (stacked)
│       ├── Best Study Time
│       ├── Streak Quality
│       ├── Consistency Trend
│       ├── Last Session
│       └── Recovery Message (if applicable)
├── Weak Areas (if any)
└── Daily Tasks
```

---

## 🔍 How to Verify Each Feature

### Heatmap
- [x] Shows 14 cells (2 weeks)
- [x] Day labels (Mon, Tue, etc.)
- [x] Colors match completion quality
- [x] Hover shows date and percentage
- [x] Legend displays at bottom

### Best Study Time
- [x] Appears after 3+ sessions
- [x] Shows time slot name
- [x] Displays average focus score
- [x] Blue icon and border

### Streak Quality
- [x] Shows current streak length
- [x] Displays quality percentage
- [x] Has quality indicator emoji
- [x] Green icon and border

### Consistency Trend
- [x] Appears after 4+ sessions
- [x] Shows arrow (↑/↓/→)
- [x] Displays percentage change
- [x] Color matches direction

### Last Session
- [x] Shows most recent session
- [x] Displays duration, focus, engagement
- [x] Shows date
- [x] Blue icon and border

### Recovery Message
- [x] Appears when day is missed
- [x] Suggests recovery time
- [x] Has pulse animation
- [x] Yellow warning style

---

## 🎬 Demo Talking Points

### Heatmap
"This heatmap gives you an instant view of your consistency. Green means you're crushing it with high-quality sessions, yellow is decent, and red means you missed or had a poor session."

### Best Study Time
"The system analyzed when you study and found you perform best in the evening. This is personalized to YOUR data, not generic advice."

### Streak Quality
"We don't just count days—we measure quality. A 5-day streak at 78% quality is way better than a 10-day streak at 40%."

### Consistency Trend
"Your consistency is improving by 12% compared to last week. The arrow makes it instantly clear whether you're trending up or down."

### Last Session
"Quick reference to your most recent activity. You can see at a glance how your last session went."

### Recovery Message
"If you miss a day, the system doesn't just nag you—it gives you a specific, actionable recovery plan. Add 20 minutes today to get back on track."

---

## 🐛 Troubleshooting

### Heatmap Not Showing
- Need at least 1 completed session
- Check that history array has data
- Verify date format is 'yyyy-MM-dd'

### Best Study Time Not Appearing
- Need minimum 3 sessions
- Sessions must have timestamps
- Check that timestamps are valid ISO strings

### Streak Quality Not Showing
- Need active streak (currentStreak > 0)
- Check that history has recent sessions
- Verify focusScore is being saved

### Trend Not Appearing
- Need minimum 4 sessions in history
- Check that focusScore is saved for each session
- Verify history array length

### Last Session Not Showing
- Need at least 1 completed session
- Check history array is not empty
- Verify last history entry has required fields

### Recovery Message Not Showing
- Only shows when yesterday is missed
- Won't show if today already has completion
- Check date comparison logic

---

## 📊 Sample Data for Testing

### Quick Test Data
Complete sessions with these characteristics:

**Session 1 (Morning - 9 AM)**
- Duration: 45 mins
- Focus: 85%
- High interactions

**Session 2 (Afternoon - 2 PM)**
- Duration: 60 mins
- Focus: 70%
- Medium interactions

**Session 3 (Evening - 7 PM)**
- Duration: 90 mins
- Focus: 90%
- High interactions

**Session 4 (Evening - 8 PM)**
- Duration: 75 mins
- Focus: 88%
- High interactions

**Expected Results:**
- ✅ Heatmap: 4 green cells
- ✅ Best Time: "Evening (5-11)" with ~89% avg
- ✅ Streak: "4-day streak (Quality: 83%)"
- ✅ Trend: "Improving ↑" (if previous sessions were lower)
- ✅ Last Session: Shows session 4 details

---

## ✅ Success Checklist

After testing, verify:
- [x] Heatmap displays with correct colors
- [x] Hover effects work on heatmap
- [x] Best study time calculates correctly
- [x] Streak quality shows percentage
- [x] Trend indicator appears with arrow
- [x] Last session displays recent data
- [x] Recovery message triggers when appropriate
- [x] All cards have proper styling
- [x] Grid layout is responsive
- [x] No console errors

---

## 🎯 Key Differentiators

### What Makes This Special

**Heatmap:**
- Not just completion tracking
- Quality-based coloring
- Visual pattern recognition

**Best Study Time:**
- Data-driven recommendation
- Personalized to user
- Actionable insight

**Streak Quality:**
- Quality over quantity
- Gamification with meaning
- Motivational feedback

**Consistency Trend:**
- Shows progress direction
- Simple visual indicator
- Comparative analysis

**Last Session:**
- Quick reference
- Context for next session
- Engagement awareness

**Recovery Message:**
- Proactive intervention
- Specific action item
- Prevents streak loss

---

## 🚀 Ready to Demo!

All visual analytics features are:
- ✅ Implemented
- ✅ Tested
- ✅ Documented
- ✅ Demo-ready

**Current Status:** Fully operational
**Server:** http://localhost:5175/
**Documentation:** See VISUAL_ANALYTICS.md for details

---

**Happy Testing! 📊**
