# Anti-Cheat Features Documentation

## 🔥 Overview

The AI Learning Consistency Coach now includes advanced anti-cheat mechanisms that make it significantly harder to fake progress and ensure genuine learning authenticity.

---

## ✅ Implemented Features

### 1. ACTIVE PRESENCE CHECK (CRITICAL) ✅

**What it does:**
- Random popup appears every 3-6 minutes during active study sessions
- Asks: "What are you currently studying?"
- User must respond within 15-20 seconds

**Options:**
- Select from current subtasks
- Enter custom answer

**Enforcement:**
- If ignored or timeout: -20 trust score
- If passed: +8 trust score per check
- Timer pauses during check
- Visual warning if failed

**Implementation:**
- `PresenceCheckModal.jsx` - Modal component with countdown timer
- Random scheduling using `setTimeout` with 3-6 minute delay
- Tracks `presenceChecksPassed` and `presenceChecksFailed`

---

### 2. PROGRESSIVE TASK UNLOCKING ✅

**What it does:**
- Subtasks must be completed in sequential order
- Cannot skip to later subtasks without completing earlier ones

**Enforcement:**
- Clicking out-of-order subtask shows warning
- Warning: "⚠️ Complete in order"
- Prevents toggle action
- Warning auto-dismisses after 3 seconds

**Implementation:**
- Check in `toggleSubtask()` function
- Validates previous subtasks are completed
- Visual feedback with warning badge

---

### 3. INACTIVITY / IDLE DETECTION ✅

**What it does:**
- Tracks time since last interaction (click, typing)
- Monitors tab switching using Visibility API
- Detects periods of no activity (2+ minutes)

**Signals Tracked:**
- No clicks or typing
- Tab switches (leaving page)
- Mouse/keyboard inactivity

**Enforcement:**
- Inactivity > 2 minutes: -3 trust per minute
- Each tab switch: -5 trust
- Visual warning banner appears
- Real-time "Session Appears Inactive" alert

**Implementation:**
- `inactivityTimerRef` tracks idle time
- `lastInteractionTime` timestamp updated on interaction
- Visibility API for tab switching
- Warning banner with pulse animation

---

### 4. CONFIDENCE DECAY SYSTEM ✅

**What it does:**
- Trust score gradually decreases during inactive periods
- Accumulates decay factor based on inactivity duration

**Formula:**
```javascript
confidenceDecay += 0.5 per second of inactivity
trustScore -= confidenceDecay (at session end)
```

**Effect:**
- Passive sessions lose value over time
- Encourages active engagement
- Visible in session summary

**Implementation:**
- `confidenceDecay` state variable
- Increments during inactivity detection
- Applied to final trust score calculation

---

### 5. SESSION VALIDATION CHECK ✅

**What it does:**
- At session end, asks detailed questions:
  - "Which topics did you study?"
  - "Approximately how many minutes did you spend?"
  - "What did you learn? (Reflection)"

**Validation:**
- Compares time estimate with actual duration
- Checks topic description length (min 10 chars)
- Validates reflection quality (min 30 chars)

**Penalties:**
- Time estimate off by >50%: -10 trust
- Topics too brief (<10 chars): -15 trust
- Reflection too short (<30 chars): -10 trust

**Implementation:**
- `SessionValidationModal.jsx` - Comprehensive validation form
- 2-second "Analyzing session..." delay (psychological effect)
- Unrealistic answer detection
- Validation warnings displayed in summary

---

### 6. BEHAVIOR PATTERN DETECTION ✅

**What it does:**
- Analyzes last 3-10 sessions for suspicious patterns
- Detects:
  - Same exact study duration repeatedly
  - Consistently low interaction (<2 avg)
  - Multiple presence check failures (≥2)

**Enforcement:**
- Identical durations: -10 trust + warning
- Low interaction pattern: -15 trust + warning
- Multiple failures: -20 trust + warning

**Warnings:**
- "⚠️ Unusual activity pattern detected: Identical session durations"
- "⚠️ Unusual activity pattern detected: Consistently low interaction"
- "⚠️ Unusual activity pattern detected: Multiple presence check failures"

**Implementation:**
- `behaviorPatterns` array in stats
- Stores last 10 sessions
- Pattern analysis in `handleValidationSubmit()`
- Automatic detection and penalty application

---

### 7. DELAYED REWARD SYSTEM ✅

**What it does:**
- Shows "Analyzing session..." message for 2 seconds
- Creates perception of intelligent validation
- Then updates trust score and credibility panel

**Psychological Effect:**
- Users perceive system as more intelligent
- Reduces instant gratification
- Increases perceived legitimacy

**Implementation:**
- `isAnalyzing` state in SessionValidationModal
- 2-second delay with shimmer animation
- Smooth transition to results

---

### 8. ENHANCED TRUST SCORE LOGIC ✅

**New Signals Integrated:**

```javascript
Trust Score Calculation:

Base Signals:
+ Time > 80% target: +10
+ Time > 50% target: +5
+ Interactions > 10: +5
+ Reflection > 40 chars: +5

- Interactions < 3: -15
- Tab switches: -5 each
- Reflection < 20 chars: -5

NEW Anti-Cheat Signals:
+ Presence checks passed: +8 each
- Presence checks failed: -20 each
- Inactivity minutes: -3 per minute
- Confidence decay: -accumulated value
- Session validation penalty: -variable
- Warnings: -5 each
- Pattern detection: -10 to -20

Final: Clamped to 0-100
```

---

## 🎨 UI Enhancements

### Real-Time Warnings
- Tab switch counter with icon
- Inactive detection badge
- Presence check failed indicator
- Unlock order warning
- Verification success badge

### Session Summary Enhancements
- Presence checks passed/failed display
- Trust score change (+/- indicator)
- Validation warnings list
- Color-coded metrics

### Visual Feedback
- Pulse animations on warnings
- Color transitions (green/yellow/red)
- Shimmer effect during analysis
- Real-time warning banners

---

## 📊 Data Tracked

### Per Session
```javascript
{
  seconds: number,
  tabSwitches: number,
  interactions: number,
  presenceChecksPassed: number,
  presenceChecksFailed: number,
  inactiveSeconds: number,
  confidenceDecay: number,
  warnings: number,
  validationPenalty: number,
  validationWarnings: string[]
}
```

### Behavior Patterns
```javascript
{
  duration: number,
  interactions: number,
  tabSwitches: number,
  presenceChecksPassed: number,
  presenceChecksFailed: number,
  inactiveMinutes: number,
  timestamp: number
}
```

---

## 🎯 Anti-Cheat Effectiveness

### What Users CANNOT Do:
❌ Complete tasks instantly (30% minimum time)
❌ Ignore presence checks without penalty
❌ Stay inactive for long periods
❌ Skip subtasks out of order
❌ Provide unrealistic session summaries
❌ Maintain patterns of suspicious behavior
❌ Switch tabs frequently without consequences

### What Users MUST Do:
✅ Actively interact during sessions
✅ Respond to presence checks promptly
✅ Complete subtasks in order
✅ Provide accurate session summaries
✅ Maintain genuine engagement patterns
✅ Stay focused (minimal tab switching)

---

## 🔧 Configuration

### Timing Constants
```javascript
PRESENCE_CHECK_MIN: 180 seconds (3 minutes)
PRESENCE_CHECK_MAX: 360 seconds (6 minutes)
PRESENCE_CHECK_TIMEOUT: 20 seconds
INACTIVITY_THRESHOLD: 120 seconds (2 minutes)
VALIDATION_DELAY: 2000ms (2 seconds)
```

### Thresholds
```javascript
MIN_TOPIC_LENGTH: 10 characters
MIN_REFLECTION_LENGTH: 30 characters
MIN_TIME_THRESHOLD: 30% of target
PATTERN_DETECTION_SESSIONS: 3 minimum
```

### Penalties
```javascript
PRESENCE_CHECK_FAIL: -20 trust
PRESENCE_CHECK_PASS: +8 trust
TAB_SWITCH: -5 trust each
INACTIVITY_MINUTE: -3 trust
VALIDATION_PENALTY: -10 to -15 trust
PATTERN_DETECTION: -10 to -20 trust
```

---

## 🚀 Demo Script

### Showing Anti-Cheat Features

**1. Start a Session**
- Click "Start" on a task
- Timer begins, interactions tracked

**2. Demonstrate Presence Check** (wait 3-6 mins or reduce timer for demo)
- Popup appears with countdown
- Show timeout scenario (ignore it)
- Show success scenario (answer correctly)

**3. Show Progressive Unlocking**
- Try to click subtask 3 before completing subtask 1
- Warning appears: "Complete in order"

**4. Demonstrate Inactivity Detection**
- Don't interact for 2+ minutes
- Warning banner appears
- Trust score decreases

**5. Show Tab Switching**
- Switch to another tab
- Come back
- "Tab switched 1x" warning visible

**6. Complete Session**
- Stop timer
- Session validation modal appears
- Fill out all fields
- "Analyzing session..." delay
- Session summary with all metrics

**7. Show Pattern Detection**
- Complete 3 sessions with similar suspicious patterns
- System detects and warns
- Trust score penalized

---

## 📈 Impact on Trust Score

### Example Session Scenarios

**Scenario A: Perfect Session**
- Time: 100% of target (+10)
- Interactions: 15 (+5)
- Presence checks: 2 passed (+16)
- No tab switches (0)
- Good reflection (+5)
- **Total: +36 trust**

**Scenario B: Suspicious Session**
- Time: 40% of target (+5)
- Interactions: 2 (-15)
- Presence checks: 1 failed (-20)
- Tab switches: 3 (-15)
- Poor reflection (-5)
- Inactivity: 5 mins (-15)
- **Total: -65 trust**

**Scenario C: Pattern Detected**
- Normal session: +20 trust
- Pattern penalty: -15 trust
- **Total: +5 trust (reduced reward)**

---

## 🎓 Best Practices

### For Genuine Users
- Stay focused during sessions
- Respond to presence checks promptly
- Complete subtasks in order
- Interact regularly (notes, checkboxes)
- Provide honest session summaries
- Avoid tab switching

### For Developers
- Adjust timing constants for testing
- Monitor false positive rates
- Balance penalties (not too harsh)
- Provide clear feedback
- Test edge cases
- Consider accessibility

---

## 🐛 Edge Cases Handled

✅ User closes presence check modal → Timeout penalty
✅ User refreshes page during session → Session lost (by design)
✅ Multiple rapid interactions → Counted normally
✅ Very short sessions → Blocked by 30% rule
✅ Identical durations → Pattern detection
✅ Network issues → Local state preserved
✅ Tab visibility false positives → Minimal penalty per switch

---

## 📝 Future Enhancements

### Potential Additions
- [ ] Micro quiz after session (1 question)
- [ ] Mouse movement tracking
- [ ] Keystroke pattern analysis
- [ ] Camera-based attention detection (optional)
- [ ] Peer comparison (anonymized)
- [ ] Machine learning pattern detection
- [ ] Adaptive difficulty based on trust
- [ ] Gamification for high trust users

---

## ✅ Testing Checklist

- [ ] Presence check appears randomly
- [ ] Presence check timeout works
- [ ] Progressive unlocking enforced
- [ ] Inactivity detection triggers
- [ ] Tab switching tracked
- [ ] Confidence decay applies
- [ ] Session validation works
- [ ] Pattern detection activates
- [ ] Trust score updates correctly
- [ ] Warnings display properly
- [ ] Session summary shows all metrics
- [ ] Delayed reward effect works

---

**Status: ✅ All anti-cheat features implemented and functional!**

The system is now significantly harder to fake and provides genuine learning authenticity detection through comprehensive behavioral signal analysis.
