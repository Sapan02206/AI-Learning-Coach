# Quick Start: Anti-Cheat Features

## 🚀 Immediate Testing Guide

### Prerequisites
Server is running at: **http://localhost:5175/**

---

## 🎯 5-Minute Feature Demo

### Step 1: Create a Plan (1 min)
1. Open http://localhost:5175/
2. Fill the form:
   - Subject: "Data Structures"
   - Deadline: 7 days from today
   - Daily Minutes: 60
   - Intensity: Medium
3. Click "Generate Study Plan"

### Step 2: Start a Session (30 sec)
1. Click "Start" on the first task
2. Timer begins
3. Notice: "Activity is being monitored" message

### Step 3: Test Progressive Unlocking (30 sec)
1. Try clicking Subtask 3 (without completing Subtask 1)
2. **Result:** Warning appears "⚠️ Complete in order"
3. Complete Subtask 1 first
4. Now Subtask 2 unlocks

### Step 4: Test Interaction Tracking (1 min)
1. Click around the session area
2. Type in the notes textarea
3. Check/uncheck subtasks
4. **Watch:** "Interactions" counter increases

### Step 5: Test Tab Switching (30 sec)
1. Switch to another browser tab
2. Come back to the app
3. **Result:** "Tab switched 1x" warning appears

### Step 6: Test Inactivity Detection (2 min)
**Option A: Wait naturally**
- Don't interact for 2+ minutes
- **Result:** "Session Appears Inactive" banner appears

**Option B: For quick demo** (modify code temporarily)
- Reduce `INACTIVITY_THRESHOLD` from 120000 to 10000 (10 seconds)
- Don't interact for 10 seconds
- Banner appears

### Step 7: Test Presence Check (3-6 min)
**Option A: Wait naturally**
- Keep session active for 3-6 minutes
- **Result:** Presence check popup appears with countdown

**Option B: For quick demo** (modify code temporarily)
- In `Timer.jsx`, change:
  ```javascript
  const randomDelay = (180 + Math.random() * 180) * 1000;
  // TO:
  const randomDelay = 10 * 1000; // 10 seconds
  ```
- Wait 10 seconds
- Popup appears

**Test Both Scenarios:**
1. **Ignore it:** Let countdown reach 0
   - **Result:** "Check failed" badge, -20 trust
2. **Answer it:** Select a subtask or enter custom answer
   - **Result:** "Verified: 1x" badge, +8 trust

### Step 8: Complete Session (1 min)
1. Click "Stop" button
2. **Session Validation Modal** appears
3. Fill all fields:
   - Topics: "Binary search trees, recursion"
   - Time estimate: Enter approximate minutes
   - Reflection: Write 30+ characters
4. Click "Submit & Analyze"
5. **Watch:** "Analyzing session..." delay (2 seconds)
6. **Session Summary** appears with:
   - Time spent
   - Focus score
   - Presence checks passed/failed
   - Trust score change
   - Validation warnings (if any)

### Step 9: Test Pattern Detection (10 min)
1. Complete 3 sessions with similar suspicious behavior:
   - Very short durations
   - Low interactions
   - Failed presence checks
2. **Result:** After 3rd session, warning appears:
   - "⚠️ Unusual activity pattern detected"
   - Trust score heavily penalized

---

## 🎨 Visual Indicators to Watch

### During Session
- ✅ Interaction counter (bottom right)
- ⚠️ Tab switch warning (yellow)
- ❌ Inactive warning (red banner)
- ❌ Presence check failed (red badge)
- ✅ Verified badge (green)
- ⚠️ Unlock order warning (yellow)

### Session Summary
- Focus score (color-coded)
- Presence checks (passed/failed)
- Trust change (+/- with color)
- Validation warnings (if any)

### Dashboard
- Trust score (animated)
- Risk level (color-coded)
- Engagement level
- Credibility panel

---

## 🔧 Quick Code Modifications for Demo

### Reduce Presence Check Timing
**File:** `src/components/Dashboard/Timer.jsx`
**Line:** ~65

```javascript
// ORIGINAL (3-6 minutes)
const randomDelay = (180 + Math.random() * 180) * 1000;

// FOR DEMO (10 seconds)
const randomDelay = 10 * 1000;
```

### Reduce Inactivity Threshold
**File:** `src/components/Dashboard/Timer.jsx`
**Line:** ~95

```javascript
// ORIGINAL (2 minutes)
if (timeSinceLastInteraction > 120000) {

// FOR DEMO (10 seconds)
if (timeSinceLastInteraction > 10000) {
```

### Reduce Presence Check Timeout
**File:** `src/components/Dashboard/PresenceCheckModal.jsx`
**Line:** ~6

```javascript
// ORIGINAL (20 seconds)
const [timeLeft, setTimeLeft] = useState(20);

// FOR DEMO (5 seconds)
const [timeLeft, setTimeLeft] = useState(5);
```

**⚠️ Remember to revert these changes after demo!**

---

## 📊 Expected Results

### Good Session
- Time: 80%+ of target
- Interactions: 10+
- Presence checks: All passed
- No tab switches
- Good reflection
- **Trust: +30 to +40**

### Bad Session
- Time: <50% of target
- Interactions: <3
- Presence checks: Failed
- Multiple tab switches
- Poor reflection
- **Trust: -40 to -60**

### Suspicious Pattern (3 sessions)
- Identical durations
- Low interactions
- Multiple failures
- **Trust: Additional -15 to -20**

---

## 🐛 Troubleshooting

### Presence Check Not Appearing
- Wait full 3-6 minutes
- OR modify code as shown above
- Ensure timer is active (not paused)

### Inactivity Not Detecting
- Wait full 2 minutes without ANY interaction
- Don't move mouse, don't type, don't click
- OR modify code as shown above

### Progressive Unlocking Not Working
- Ensure you're clicking a later subtask
- First subtask always unlocked
- Must complete in order: 1 → 2 → 3

### Session Validation Not Showing
- Ensure you stopped the timer
- Must have run for at least 30% of target time
- Check console for errors

---

## 📝 Quick Reference

### Anti-Cheat Features
1. ✅ Presence Check (3-6 min)
2. ✅ Progressive Unlocking
3. ✅ Inactivity Detection (2 min)
4. ✅ Confidence Decay
5. ✅ Session Validation
6. ✅ Pattern Detection (3 sessions)
7. ✅ Delayed Reward (2 sec)
8. ✅ Enhanced Trust Score

### Key Penalties
- Presence fail: -20
- Tab switch: -5 each
- Inactivity: -3 per minute
- Validation: -10 to -15
- Pattern: -10 to -20

### Key Rewards
- Presence pass: +8
- High interaction: +5
- Good time: +10
- Good reflection: +5

---

## 🎬 Demo Script (30 seconds each)

1. "Let me show you the presence check system..."
   - Start session, wait/trigger popup
   - Show timeout scenario
   - Show success scenario

2. "Tasks must be completed in order..."
   - Try to skip ahead
   - Warning appears

3. "The system detects inactivity..."
   - Don't interact
   - Banner appears

4. "Tab switching is monitored..."
   - Switch tabs
   - Counter increases

5. "At the end, comprehensive validation..."
   - Stop session
   - Fill validation form
   - Show analysis delay
   - Display summary

6. "Pattern detection catches suspicious behavior..."
   - Show 3 similar sessions
   - Warning appears

---

## ✅ Success Criteria

After testing, you should see:
- [x] Presence check popup appeared
- [x] Progressive unlocking enforced
- [x] Inactivity warning displayed
- [x] Tab switches tracked
- [x] Session validation worked
- [x] Analysis delay showed
- [x] Session summary complete
- [x] Trust score updated
- [x] Pattern detection activated (after 3 sessions)

---

## 🚀 Ready to Demo!

The system is fully functional and ready to demonstrate. All anti-cheat features are working and visible.

**Current Status:** ✅ All features operational
**Server:** http://localhost:5175/
**Documentation:** See ANTI_CHEAT_FEATURES.md for details

---

**Happy Testing! 🎉**
