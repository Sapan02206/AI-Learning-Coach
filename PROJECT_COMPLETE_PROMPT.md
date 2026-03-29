# 🎯 COMPLETE PROJECT PROMPT
## AI Learning Consistency Coach - Full Feature Specification

---

## 📋 PROJECT OVERVIEW

Create an AI-powered learning consistency coach web application that uses advanced behavioral tracking to verify genuine learning and prevent fake studying. The app should track student engagement through multiple signals, validate educational content, and provide honest accountability through a trust score system.

---

## 🎨 TECH STACK

- **Frontend**: React 18 (via CDN with Babel)
- **Styling**: Custom CSS with glassmorphism design
- **Storage**: LocalStorage (no backend required)
- **Icons**: Custom SVG icons (inline)
- **Date Handling**: Custom date utility functions
- **PDF Rendering**: PDF.js library (CDN)
- **Deployment**: GitHub Pages (single HTML file)

---

## 🏗️ CORE FEATURES

### 1. ONBOARDING & STUDY PLAN GENERATION

**Requirements:**
- Form to collect:
  - Subject name
  - Goal deadline (date picker)
  - Daily study minutes (10-480 range)
  - Difficulty level (Easy/Medium/Hard)
- AI-generated study plan with:
  - Daily tasks distributed across days until deadline
  - Each task has subtasks (3 per task)
  - Tasks include duration and status tracking
- Plan saved to localStorage
- Smooth transition to dashboard after plan creation

**UI Design:**
- Glassmorphism card design
- Gradient background (#0f172a to #1e293b)
- Smooth animations (fadeIn, slideInRight)
- Responsive layout (max-width: 1100px)

---

### 2. DASHBOARD WITH TRUST SCORE SYSTEM

**Requirements:**

#### Learning Credibility Panel:
- **Trust Score** (0-100%):
  - Starts at 100%
  - Decreases with bad behavior
  - Increases with good behavior
  - Color-coded: Green (>80), Orange (50-80), Red (<50)
- **Risk Level**: Low/Medium/High based on trust score
- **Engagement Level**: High/Medium/Low based on recent activity
- Real-time updates with pulse animation

#### Progress Widgets:
- **Current Streak**: Days of consecutive completion
- **Longest Streak**: Best streak achieved
- **Consistency Score**: Percentage based on completion rate
  - Formula: `(totalTasksCompleted / totalTasksAssigned) × 100`
  - Updates automatically after completing tasks
  - Recalculates on app load to fix existing data
  - Example: 13 tasks done out of 22 = 59% consistency
- **Tasks Completed**: X/Y format with progress bar

#### Daily Tasks:
- List of today's tasks with:
  - Task title and duration
  - Subtasks with checkboxes
  - Status indicators (pending/completed)
  - Completion tracking
- Mark tasks as complete
- Visual feedback on completion

---

### 3. VIDEO LEARNING MODE

**Requirements:**

#### Content Validation:
- Validate YouTube URLs before allowing playback
- **Educational Keywords** (MUST have at least one):
  - tutorial, lecture, course, learn, education, study
  - programming, coding, math, science, physics, chemistry
  - algorithm, data structure, engineering, medical
  - exam, test, preparation, interview, career, skill
  - 50+ educational keywords total
- **Blocked Keywords** (instant block if found):
  - music, song, movie, trailer, game, gaming, comedy
  - tmkoc, serial, episode, show, drama, entertainment
  - vlog, prank, funny, meme, cartoon, anime
  - sports, cricket, football, dance, party, fashion
  - 30+ entertainment keywords total
- Check both video title AND channel name
- Block by default if validation fails (safer approach)
- Show error alert and apply penalties if blocked

#### Video Player:
- YouTube iframe embed (simple, reliable)
- Fullscreen mode with toggle button
- Responsive sizing (480px normal, full viewport in fullscreen)
- Video controls (play, pause, seek, volume)

#### Real-Time Behavioral Tracking:
Display 4 metrics that update in real-time:

1. **Watch Time**:
   - Format: "Xm Ys"
   - Updates every second
   - Color: Blue (accent-primary)

2. **Mouse Activity**:
   - Counter of mouse movements
   - Color-coded:
     - Green (>50 movements) = Good engagement
     - Orange (20-50) = Medium engagement
     - Red (<20) = Low engagement
   - Updates on every mouse move

3. **Interactions**:
   - Total clicks + scroll events
   - Updates in real-time
   - Shows active participation

4. **Tab Switches**:
   - Counter of tab/window switches
   - Color: Red if >5, White otherwise
   - Detects distracted behavior

#### Inactivity Detection:
- **When Warning Shows**:
  - Tab switched and user doesn't return for 2+ minutes
- **When Warning Does NOT Show**:
  - User is watching video (even without mouse movement)
  - User is interacting normally
- **Warning Display**:
  - Red pulsing alert box
  - Eye-off icon
  - Message: "⚠️ Inactivity Detected - Tab switched for X minutes. Your trust score is decreasing."
  - Automatically disappears when user becomes active

#### Scoring System:
- **Session Duration Penalties**:
  - <30 seconds = 0% score (instant fail)
  - <1 minute = -60 points
  - <2 minutes = -30 points
  - <3 minutes = -15 points
  - ≥5 minutes = +10 points (bonus)

- **Engagement Penalties**:
  - No interaction (<5 mouse, <3 scroll, <2 clicks) = -50 points
  - Very low engagement (<10 mouse, <5 scroll) = -35 points
  - Low engagement (<20 mouse) = -20 points

- **Tab Switching Penalty**:
  - >5 tab switches = -25 points

- **Trust Score Impact**:
  - Excellent (Focus ≥80, Engagement ≥80) = +5 trust
  - Good (Focus ≥60, Engagement ≥60) = +2 trust
  - Bad (Focus <50 OR Engagement <50) = -5 trust
  - Very bad (Focus <30 OR Engagement <30) = -10 trust

#### Session Summary:
- Time spent
- Focus score (0-100%)
- Engagement score (0-100%)
- Behavior type (Highly Engaged, Balanced, Needs Improvement, etc.)
- Trust score change (+/- points)
- Detailed insight message

---

### 4. PDF LEARNING MODE

**Requirements:**

#### PDF Upload & Rendering:
- File input for PDF upload
- PDF.js library integration (CDN)
- Canvas-based rendering
- Page navigation (Previous/Next buttons)
- Page counter (X/Y format)
- Responsive sizing

#### Fullscreen Mode:
- Toggle fullscreen button
- Page navigation controls IN fullscreen:
  - Previous button (disabled on page 1)
  - Page counter display
  - Next button (disabled on last page)
  - End Session button
- All controls visible at bottom of screen
- Exit fullscreen button

#### Highlighting Feature:
- "Highlight Important" button
- Prevents rapid highlighting:
  - Must wait 3+ seconds on page before highlighting
  - Alert if trying to highlight too quickly
- Tracks highlight quality:
  - Time spent before highlighting
  - Number of highlights
  - Quality score based on reading time

#### Real-Time Behavioral Tracking:
Display 5 metrics:

1. **Pages Visited**: X/Y format
2. **Rapid Page Flips**: Counter (red if >5)
3. **Fast Scrolling**: Counter (red if >5)
4. **Highlights**: Counter
5. **Tab Switches**: Counter (red if >5)

Additional tracking:
- **Time on Current Page**: Live timer (updates every second)
- **Page Time Tracking**: Records time spent on each page
- **Rapid Page Detection**: Flags pages viewed <5 seconds
- **Rapid Scroll Detection**: Flags scrolling >2 pixels/ms

#### Inactivity Detection:
- **When Warning Shows**:
  1. Same page for 10+ minutes without changing pages (gives students time to read)
  2. Tab switched and user doesn't return for 2+ minutes
- **When Warning Does NOT Show**:
  - User is reading a page (even without mouse movement)
  - User changes pages regularly
  - User is within the 10-minute reading time per page
- **Warning Display**:
  - Red pulsing alert box
  - Eye-off icon
  - Two types of messages:
    - "⚠️ Inactivity Detected - You've been on the same page for X minutes. Change pages to continue learning."
    - "⚠️ Inactivity Detected - Tab switched for X minutes. Your trust score is decreasing."
  - Automatically disappears when user becomes active

#### Scoring System:
- **Instant Fail**:
  - Session <30 seconds = 0% score

- **Severe Penalties**:
  - Session <1 minute = -60 points
  - Barely read (<20% pages) = -40 points
  - Very few pages (<3) = -30 points
  - Too fast reading (<5s/page) = -25 points
  - Fast reading (<10s/page) = -15 points
  - Too many tab switches (>5) = -20 points
  - Rapid page flips = -8 points each
  - Rapid scrolling = -5 points each
  - Low mouse activity = -15 points
  - Low scroll activity = -15 points

- **Reading Quality Score**:
  - Starts at 100
  - Applies all penalties
  - Final score = max(0, 100 - penalties)

#### Session Summary:
- File name
- Total pages
- Pages visited
- Session duration
- Reading quality score (0-100%)
- Highlight count and quality
- Average time per page
- Behavioral warnings

---

### 5. ADVANCED BEHAVIORAL TRACKER

**Requirements:**

Create a global `AdvancedBehaviorTracker` class that tracks:

#### Mouse Tracking:
- Mouse movements counter
- Mouse positions array (last 100 positions)
- Mouse intensity calculation (distance traveled)

#### Scroll Tracking:
- Scroll events counter
- Scroll depth percentage
- Scroll speed array
- Rapid scroll detection (>2 px/ms)

#### Interaction Tracking:
- Keyboard events counter
- Click events counter
- Total interaction density (interactions per minute)

#### Focus Tracking:
- Focus lost counter (tab switches)
- Last activity timestamp
- Idle time detection (>120s)
- Visibility change detection

#### Methods:
- `start()` - Begin tracking
- `stop()` - Stop tracking
- `reset()` - Clear all data
- `getSessionData()` - Return all metrics
- Event handlers for all tracked events

---

### 6. SESSION SUMMARY MODAL

**Requirements:**

Display after completing any learning session:

#### Layout:
- Fixed overlay with backdrop blur
- Centered glassmorphism card
- Pulse animation on open
- Color-coded border based on score

#### Content:
- Icon (Target/Clock/Zap based on score)
- "Session Complete" title
- Session type (Video/PDF)
- Time spent (formatted as Xm Ys)
- Focus score with color coding
- Engagement score (if applicable)
- Behavior type badge
- Completion percentage (if applicable)
- Presence checks passed/failed (if applicable)
- Trust score change (+/- with color)
- Insight message
- Validation warnings (if any)

#### Scoring Display:
- Grid layout for metrics
- Color-coded values:
  - Green for good scores
  - Orange for medium
  - Red for poor
- Progress bars where applicable

---

### 7. CONSISTENCY HEATMAP

**Requirements:**

Visual calendar showing study consistency:

#### Display:
- Last 30 days
- Grid layout (7 columns for days of week)
- Each day shows:
  - Date number
  - Day abbreviation (Mon, Tue, etc.)
  - Color intensity based on activity:
    - Dark gray = No activity
    - Light green = Some activity
    - Medium green = Good activity
    - Bright green = Excellent activity

#### Calculation:
- Activity level based on:
  - Tasks completed
  - Focus score
  - Session duration
- Hover shows details (optional)

---

### 8. INSIGHTS PANEL

**Requirements:**

AI-generated insights based on behavior:

#### Insight Types:
- **Low Trust (<50)**: "⚠️ Low engagement detected. Increase interaction to improve credibility."
- **Medium Trust (<80)**: "👀 Tab switching detected. Stay focused to maintain Trust Score."
- **Low Consistency (<50)**: "📉 Inconsistent pattern detected. Let's start with one micro-task today."
- **Good Streak (>3)**: "🔥 Strong consistency detected. System confidence increasing."
- **Default**: "Great job keeping up with your schedule!"

#### Display:
- Glassmorphism card
- Icon based on insight type
- Color-coded border
- Animated appearance

---

### 9. DATA PERSISTENCE

**Requirements:**

#### LocalStorage Keys:
- `ai_coach_plan` - Study plan data
- `ai_coach_tasks` - Tasks array
- `ai_coach_stats` - Statistics object

#### Stats Object Structure:
```javascript
{
  currentStreak: 0,
  longestStreak: 0,
  consistencyScore: 100,
  totalTasksCompleted: 0,
  totalTasksAssigned: 0,
  trustScore: 100,
  history: [
    {
      date: "2024-01-01",
      dayOfWeek: "Monday",
      status: "completed",
      focusScore: 85,
      engagementScore: 78,
      behaviorType: "Highly Engaged",
      learningMode: "video",
      trustScore: 100,
      timestamp: "2024-01-01T10:00:00Z",
      sessionData: {...}
    }
  ]
}
```

#### Functions:
- `savePlan(plan)` - Save study plan
- `getPlan()` - Retrieve study plan
- `saveTasks(tasks)` - Save tasks array
- `getTasks()` - Retrieve tasks
- `saveStats(stats)` - Save statistics
- `getStats()` - Retrieve statistics
- `clearAll()` - Clear all data

---

### 10. UI/UX DESIGN SYSTEM

**Requirements:**

#### Color Palette:
```css
--bg-dark: #0f172a
--bg-card: #1e293b
--bg-card-hover: #334155
--text-main: #f8fafc
--text-muted: #94a3b8
--accent-primary: #3b82f6 (blue)
--accent-secondary: #10b981 (green)
--accent-glow: rgba(59, 130, 246, 0.4)
--danger: #ef4444 (red)
--warning: #f59e0b (orange)
```

#### Glassmorphism Style:
```css
background: rgba(30, 41, 59, 0.7)
backdrop-filter: blur(12px)
border: 1px solid rgba(255, 255, 255, 0.08)
border-radius: 16px
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2)
```

#### Animations:
- `fadeIn` - Opacity 0→1, translateY 10px→0
- `slideInRight` - Opacity 0→1, translateX 20px→0
- `pulse-glow` - Scale and glow effect
- `shimmer` - Loading effect
- Smooth transitions (0.2-0.3s cubic-bezier)

#### Typography:
- Font: 'Inter' or system fonts
- Headings: 700 weight, -1px letter-spacing
- Body: 400 weight, 1.6 line-height
- Muted text: #94a3b8 color

#### Buttons:
- Hover: translateY(-2px) + shadow
- Active: translateY(0)
- Disabled: opacity 0.5
- Ripple effect on click

#### Scrollbars:
- Width: 8px
- Track: rgba(255,255,255,0.05)
- Thumb: rgba(255,255,255,0.2)
- Hover: rgba(255,255,255,0.3)

---

## 🔒 SECURITY & VALIDATION

### Content Validation:
1. Extract video ID from YouTube URL
2. Fetch video metadata via YouTube oEmbed API
3. Check title and channel name for keywords
4. Block if non-educational keywords found
5. Require educational keywords to allow
6. Apply trust score penalty if blocked
7. Show error alert with explanation

### Data Validation:
- Validate form inputs (required fields, ranges)
- Sanitize user inputs
- Check date validity
- Validate file types (PDF only)

### Error Handling:
- Try-catch blocks for all async operations
- Graceful fallbacks for API failures
- User-friendly error messages
- Console logging for debugging

---

## 📱 RESPONSIVE DESIGN

### Breakpoints:
- Desktop: >1100px (max-width container)
- Tablet: 768px-1100px (responsive grid)
- Mobile: <768px (single column, stacked layout)

### Mobile Optimizations:
- Touch-friendly buttons (min 44px)
- Readable font sizes (min 16px)
- Simplified navigation
- Fullscreen video/PDF on mobile

---

## 🎯 KEY ALGORITHMS

### Trust Score Calculation:
```javascript
// Increase trust
if (focusScore >= 80 && engagementScore >= 80) trustScore += 5
else if (focusScore >= 60 && engagementScore >= 60) trustScore += 2

// Decrease trust
if (focusScore < 30 || engagementScore < 30) trustScore -= 10
else if (focusScore < 50 || engagementScore < 50) trustScore -= 5

// Clamp between 0-100
trustScore = Math.max(0, Math.min(100, trustScore))
```

### Focus Score Calculation (Video):
```javascript
let score = 100

// Duration penalties
if (duration < 30s) score = 0
else if (duration < 60s) score -= 60
else if (duration < 120s) score -= 30
else if (duration < 180s) score -= 15

// Engagement penalties
if (noInteraction) score -= 50
else if (veryLowEngagement) score -= 35
else if (lowEngagement) score -= 20

// Tab switching penalty
if (tabSwitches > 5) score -= 25

// Bonus for good behavior
if (duration >= 300s && mouseMovements > 50) score += 10

return Math.max(0, Math.min(100, score))
```

### Reading Quality Score (PDF):
```javascript
let score = 100

// Instant fail
if (duration < 30s) return 0

// Duration penalties
if (duration < 60s) score -= 60

// Reading behavior penalties
if (pagesVisited < 20% of total) score -= 40
if (pagesVisited < 3) score -= 30
if (avgTimePerPage < 5s) score -= 25
if (avgTimePerPage < 10s) score -= 15

// Interaction penalties
if (tabSwitches > 5) score -= 20
if (rapidPageFlips > 3) score -= (rapidPageFlips * 8)
if (rapidScrolls > 5) score -= (rapidScrolls * 5)
if (mouseMovements < 50) score -= 15
if (scrollEvents < 10) score -= 15

return Math.max(0, Math.min(100, score))
```

---

## 🚀 DEPLOYMENT

### Requirements:
- Single HTML file (index.html)
- All CSS inline in <style> tag
- All JavaScript inline in <script type="text/babel">
- React/ReactDOM/Babel from CDN
- PDF.js from CDN
- No build process required
- Deploy to GitHub Pages

### CDN Links:
```html
<!-- React -->
<script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>

<!-- Babel -->
<script src="https://unpkg.com/@babel/standalone@7.23.5/babel.min.js"></script>

<!-- PDF.js (loaded dynamically when needed) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
```

---

## 📊 SUCCESS METRICS

### User Engagement:
- Average session duration
- Sessions per day
- Completion rate
- Trust score trend

### Learning Verification:
- Fake studying detection rate
- Content validation accuracy
- Behavioral anomaly detection

### System Performance:
- Page load time <2s
- Real-time updates <100ms latency
- Smooth animations (60 FPS)

---

## 🎨 VISUAL EXAMPLES

### Dashboard Layout:
```
┌─────────────────────────────────────┐
│  🧠 AI Learning Coach               │
├─────────────────────────────────────┤
│  🛡️ Learning Credibility            │
│  Trust Score: 85%                   │
│  Risk Level: Low                    │
├─────────────────────────────────────┤
│  🔥 Streak: 5  🎯 Consistency: 92%  │
├─────────────────────────────────────┤
│  📚 Today's Tasks                   │
│  ☐ Math Module 1.1 (30 mins)       │
│  ☑ Physics Lecture (45 mins)       │
├─────────────────────────────────────┤
│  ▶️ Video Learning Session          │
│  📄 PDF Learning Session            │
└─────────────────────────────────────┘
```

### Video Session:
```
┌─────────────────────────────────────┐
│  [YouTube Video Player]             │
│  [⛶ Fullscreen]                    │
├─────────────────────────────────────┤
│  Watch Time: 2m 15s                 │
│  Mouse Activity: 45 🟠              │
│  Interactions: 12                   │
│  Tab Switches: 2                    │
├─────────────────────────────────────┤
│  [End Video Session]                │
└─────────────────────────────────────┘
```

---

## 🔧 TECHNICAL CONSTRAINTS

### Browser Compatibility:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance:
- Smooth 60 FPS animations
- <100ms interaction response
- <2s initial load time
- Efficient DOM updates (React)

### Storage Limits:
- LocalStorage: ~5-10MB
- Sufficient for months of data
- Implement data cleanup if needed

---

## 📝 DOCUMENTATION REQUIREMENTS

### Code Comments:
- Section headers for major components
- Function descriptions
- Complex logic explanations
- TODO markers for future improvements

### User Documentation:
- README with setup instructions
- Feature descriptions
- Screenshots/GIFs
- Demo video script

### Developer Documentation:
- Architecture overview
- Component structure
- Data flow diagrams
- API references (if any)

---

## 🎯 FUTURE ENHANCEMENTS (Optional)

### Phase 2:
- Backend integration (user accounts)
- Parent/teacher dashboard
- Multi-device sync
- Advanced analytics
- Gamification (badges, levels)

### Phase 3:
- Mobile app (React Native)
- AI-powered study recommendations
- Peer comparison (anonymous)
- Integration with LMS platforms
- Export reports (PDF)

---

## ✅ ACCEPTANCE CRITERIA

### Must Have:
- ✅ Single HTML file deployment
- ✅ Study plan generation
- ✅ Video learning with behavioral tracking
- ✅ PDF learning with behavioral tracking
- ✅ Trust score system
- ✅ Content validation
- ✅ Session summaries
- ✅ Real-time stats updates
- ✅ LocalStorage persistence
- ✅ Responsive design

### Should Have:
- ✅ Consistency heatmap
- ✅ Insights panel
- ✅ Fullscreen modes
- ✅ Highlighting feature
- ✅ Animated UI
- ✅ Error handling

### Nice to Have:
- ⭕ Dark/light theme toggle
- ⭕ Export data feature
- ⭕ Keyboard shortcuts
- ⭕ Accessibility features (ARIA)

---

## 🎬 DEMO SCENARIOS

### Scenario 1: Genuine Learning
1. Create study plan
2. Start video session with educational content
3. Watch for 5+ minutes with good engagement
4. End session → High score (80-90%)
5. Trust score increases

### Scenario 2: Fake Studying
1. Start video session
2. Don't interact (no mouse movement)
3. End after 1 minute
4. Low score (0-20%)
5. Trust score decreases

### Scenario 3: Cheating Attempt
1. Try to paste entertainment video (TMKOC)
2. System blocks with alert
3. Trust score penalty applied
4. Error message shown

### Scenario 4: PDF Learning
1. Upload PDF
2. Read carefully, highlight important parts
3. Navigate through pages slowly
4. End session → Good score (75-85%)

---

**This is the complete specification for the AI Learning Consistency Coach project!**

Use this prompt to:
- Recreate the project from scratch
- Explain features to judges/stakeholders
- Document the system architecture
- Train other developers
- Create similar projects



---

## 🆕 LATEST UPDATES (Added in Final Version)

### 1. Inactivity Detection System

**Video Sessions:**
- Monitors tab switching behavior
- Shows warning if tab switched for 2+ minutes
- Does NOT penalize students for watching without mouse movement
- Real-time pulsing red alert with clear message
- Automatically disappears when user returns

**PDF Sessions:**
- Two types of inactivity detection:
  1. Same page for 10+ minutes (gives ample reading time)
  2. Tab switched for 2+ minutes
- Smart detection that doesn't penalize genuine reading
- Page changes and highlights reset activity timer
- Context-aware warning messages

**Technical Implementation:**
```javascript
// State variables
const [lastActivityTime, setLastActivityTime] = useState(Date.now());
const [inactiveSeconds, setInactiveSeconds] = useState(0);
const [showInactiveWarning, setShowInactiveWarning] = useState(false);

// Monitoring interval (checks every second)
useEffect(() => {
    if (!isActive) return;
    
    inactivityTimerRef.current = setInterval(() => {
        const timeSinceLastActivity = Date.now() - lastActivityTime;
        
        // Video: Only tab switching matters
        // PDF: Tab switching OR 10+ mins on same page
        
        if (timeSinceLastActivity > 120000 && conditions) {
            setInactiveSeconds(Math.floor(timeSinceLastActivity / 1000));
            setShowInactiveWarning(true);
        } else {
            setShowInactiveWarning(false);
            setInactiveSeconds(0);
        }
    }, 1000);
    
    return () => clearInterval(inactivityTimerRef.current);
}, [isActive, lastActivityTime, otherDependencies]);
```

---

### 2. Consistency Score Auto-Calculation

**Problem Solved:**
- Consistency score was stuck at 100% even after completing tasks
- Old localStorage data had incorrect values

**Solution:**
- Recalculates on every task completion
- Recalculates on app load to fix existing data
- Formula: `(totalTasksCompleted / totalTasksAssigned) × 100`

**Implementation:**
```javascript
// On app load
const [stats, setStats] = useState(() => {
    const loadedStats = getStats();
    // Recalculate consistency score on load
    if (loadedStats.totalTasksAssigned > 0) {
        loadedStats.consistencyScore = Math.round(
            (loadedStats.totalTasksCompleted / loadedStats.totalTasksAssigned) * 100
        );
        saveStats(loadedStats); // Save the corrected value
    }
    return loadedStats;
});

// On task completion
newStats.consistencyScore = newStats.totalTasksAssigned > 0 
    ? Math.round((newStats.totalTasksCompleted / newStats.totalTasksAssigned) * 100)
    : 100;
```

---

### 3. Enhanced Content Validation

**Stricter Blocking:**
- 30+ blocked entertainment keywords
- 50+ required educational keywords
- Checks both title AND channel name
- Blocks by default if validation fails (safer)
- Immediate trust score penalty (-10%) for attempts

**Blocked Content Examples:**
- TMKOC (Taarak Mehta Ka Ooltah Chashmah)
- Music videos, movie trailers
- Gaming content, vlogs, pranks
- Sports highlights, comedy shows
- Entertainment serials and episodes

---

### 4. Real-Time Behavioral Metrics

**Video Session Metrics:**
1. Watch Time (updates every second)
2. Mouse Activity (color-coded: green/orange/red)
3. Interactions (clicks + scrolls)
4. Tab Switches (red if >5)

**PDF Session Metrics:**
1. Pages Visited (X/Y format)
2. Rapid Page Flips (red if >5)
3. Fast Scrolling (red if >5)
4. Highlights (tracks quality)
5. Tab Switches (red if >5)
6. Time on Current Page (live timer)

**All metrics update in real-time** - no fake or estimated values!

---

### 5. Improved Scoring Algorithms

**Video Scoring:**
- Instant fail for sessions <30 seconds
- Severe penalties for short sessions (<1 min: -60 points)
- Engagement-based scoring (mouse activity, interactions)
- Tab switching penalties (-25 points if >5 switches)
- Bonus for good behavior (+10 points for 5+ min sessions)

**PDF Scoring:**
- Instant fail for sessions <30 seconds
- Penalties for rapid page flipping (-8 points each)
- Penalties for rapid scrolling (-5 points each)
- Reading speed analysis (<5s/page: -25 points)
- Coverage analysis (<20% pages: -40 points)
- Highlight quality tracking

---

### 6. User Experience Improvements

**Visual Feedback:**
- Pulsing animations for warnings
- Color-coded metrics (green/orange/red)
- Real-time counter updates
- Smooth transitions and animations

**Error Handling:**
- Clear error messages
- Graceful fallbacks
- Console logging for debugging
- User-friendly alerts

**Accessibility:**
- Keyboard navigation support
- Clear visual indicators
- Readable font sizes
- High contrast colors

---

## 📊 TESTING THE LATEST FEATURES

### Test Inactivity Detection:

**Video:**
1. Start video session
2. Switch to another tab
3. Wait 2+ minutes
4. Return → Warning should appear
5. Interact → Warning disappears

**PDF:**
1. Start PDF session
2. Stay on same page for 10+ minutes → Warning appears
3. Change page → Warning disappears
4. OR switch tabs for 2+ minutes → Warning appears

### Test Consistency Score:
1. Check current score (should match completion rate)
2. Complete a new task
3. Score updates immediately
4. Reload page → Score persists correctly

### Test Content Validation:
1. Try pasting entertainment video URL (e.g., TMKOC)
2. Should be blocked with alert
3. Trust score decreases by 10%
4. Try educational video → Allowed

---

## 🔧 TROUBLESHOOTING

### Issue: Inactivity warning not showing
- **Solution**: Make sure you've waited full 2 minutes after tab switch
- **Solution**: For PDF, ensure you're on same page for 10+ minutes

### Issue: Consistency score still shows 100%
- **Solution**: Hard refresh (Ctrl+Shift+R) to load latest code
- **Solution**: Complete one more task to trigger recalculation

### Issue: Video blocked incorrectly
- **Solution**: Check if video title/channel has educational keywords
- **Solution**: Some educational content may be blocked if keywords missing

---

## 📝 CHANGELOG

**Version 1.3 (Latest):**
- ✅ Added inactivity detection for video and PDF sessions
- ✅ Fixed consistency score calculation
- ✅ Enhanced content validation with stricter rules
- ✅ Improved real-time metric updates
- ✅ Better error handling and user feedback

**Version 1.2:**
- ✅ Added video learning mode with behavioral tracking
- ✅ Added PDF learning mode with page tracking
- ✅ Implemented trust score system
- ✅ Added fullscreen modes

**Version 1.1:**
- ✅ Initial release with traditional timer
- ✅ Study plan generation
- ✅ Task management
- ✅ Basic behavioral tracking

---

**Last Updated**: December 2024
**Status**: ✅ Production Ready
**Deployment**: GitHub Pages (Single HTML File)
