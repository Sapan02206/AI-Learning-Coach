# AI Learning Consistency Coach

A behavior-aware learning platform that maximizes student consistency and estimates real learning authenticity using multi-signal behavioral tracking.

## 🎯 Core Philosophy

**Students don't fail because they can't plan — they fail because they can't stay consistent.**

Most tools generate plans but blindly trust users. Our system:
- Tracks behavior patterns
- Adapts plans dynamically
- Estimates whether learning is actually happening
- Provides credibility scores instead of blind trust

## ✨ Key Features

### 1. **Multi-Signal Behavioral Tracking**
The system monitors multiple signals to detect fake or low-effort behavior:

- **Time Quality**: Tracks actual time spent vs expected duration
- **Interaction Patterns**: Monitors clicks, typing, checkbox interactions
- **Tab Switching**: Detects when users leave the study session
- **Reflection Quality**: Requires 30+ character meaningful reflections
- **Suspicious Patterns**: Identifies instant completions and robotic usage

### 2. **Enforcement System**
Hard rules that prevent gaming the system:

- ❌ **Cannot complete task if time spent < 30% of expected**
- ❌ **Instant completion triggers heavy penalty**
- ❌ **Low trust score reduces streak impact**
- ❌ **Insufficient reflection blocks completion**
- ⚠️ **Tab switches reduce trust score**
- ⚠️ **Low interaction triggers warnings**

### 3. **Learning Credibility Panel** (WOW Feature)
Real-time authenticity dashboard showing:

- **Learning Authenticity %**: 0-100 score based on behavioral signals
- **Engagement Level**: High/Medium/Low based on interaction patterns
- **Risk Level**: Color-coded (Green/Yellow/Red) system confidence
- **Animated Trust Score**: Real-time visual feedback with pulse animations

### 4. **Focus Score Per Session**
Each study session receives a 0-100 focus score based on:
- Time ratio (actual vs target)
- Interaction count
- Tab switches
- Reflection quality

### 5. **Session Summary Modal**
After each session, users see:
- Time spent
- Focus score with color coding
- Personalized insight message
- Visual feedback on session quality

### 6. **Weak Area Detection**
Automatically identifies topics with:
- Low engagement patterns
- Repeated skips
- Below 60% average focus scores

### 7. **Recovery Plan Generator**
When falling behind, the system:
- Detects pace issues
- Suggests redistributed schedule
- Adds +30 minutes to next 3 days
- Forces workload adjustment

### 8. **Failure Prediction**
Predictive analytics showing:
- Current completion velocity
- Projected completion percentage
- Early warning alerts
- Pace-based recommendations

### 9. **Adaptive Rescheduling**
- Missed tasks automatically move to today
- Dynamic workload adjustment
- Buffer day utilization
- Smart task redistribution

### 10. **Behavioral Insights**
AI-powered messages based on patterns:
- "Low engagement detected"
- "Tab switching detected"
- "Strong consistency detected"
- "You skip weekends"
- "You are behind schedule"

## 🛡️ Trust Score Algorithm

The system calculates trust using multiple weighted factors:

```javascript
Trust Score Adjustments:
+ Time > 80% of target: +10 points
+ Time > 50% of target: +5 points
+ High interactions (>10): +5 points
+ Quality reflection (>40 chars): +5 points

- Low interactions (<3): -15 points
- Tab switches: -5 points each
- Short reflection (<20 chars): -5 points
- Time < 30% of target: -15 points + block completion
```

## 🎨 UI/UX Highlights

### Design Principles
- **Clean glassmorphism cards** with backdrop blur
- **Minimal layout** focused on key metrics
- **Smooth transitions** and animations
- **Color-coded states** (green/yellow/red)
- **Real-time visual feedback**
- **Animated number counters**
- **Pulse animations** on score changes

### Visual Feedback
- Trust score changes trigger pulse animations
- Color transitions based on risk level
- Progress bars with smooth animations
- Dynamic border colors
- Shimmer effects for loading states

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📊 How It Works

### 1. Plan Generation
- User inputs: subject, deadline, daily study time, difficulty
- AI generates day-wise plan with topics, revision, and buffer days
- Tasks broken into micro-subtasks

### 2. Study Session Flow
1. User starts timer for a task
2. System tracks time, interactions, tab switches
3. User completes subtasks and takes notes
4. User stops timer
5. System validates minimum time requirement (30%)
6. User provides reflection (30+ characters required)
7. System calculates focus score and trust adjustments
8. Session summary modal displays results

### 3. Behavioral Analysis
- Continuous monitoring during sessions
- Pattern detection across multiple sessions
- Historical data analysis for weak areas
- Predictive modeling for completion likelihood

### 4. Adaptive Response
- Low trust → streak not counted
- Behind schedule → recovery plan offered
- Weak areas → highlighted for attention
- Good behavior → positive reinforcement

## 🔧 Technical Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **date-fns** - Date manipulation
- **lucide-react** - Icon library
- **localStorage** - Data persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── DailyTasks.jsx          # Task list with session controls
│   │   ├── Timer.jsx                # Study session timer with tracking
│   │   ├── ProgressWidgets.jsx     # Credibility panel & metrics
│   │   ├── InsightsPanel.jsx       # AI-powered insights
│   │   ├── QuickValidationModal.jsx # Reflection validation
│   │   └── SessionSummaryModal.jsx  # Post-session feedback
│   ├── Layout/
│   │   └── Layout.jsx               # App layout with header
│   └── Onboarding/
│       └── PlanForm.jsx             # Initial plan creation
├── services/
│   ├── mockAi.js                    # Plan generation & insights
│   ├── scheduler.js                 # Task scheduling logic
│   └── storage.js                   # localStorage utilities
├── App.jsx                          # Main app component
├── main.jsx                         # Entry point
└── index.css                        # Global styles
```

## 🎯 Key Differentiators

### vs Traditional Study Planners
- ❌ Traditional: Generate plan → trust blindly
- ✅ Our System: Generate plan → track behavior → adapt → verify authenticity

### vs Habit Trackers
- ❌ Habit Trackers: User self-reports completion
- ✅ Our System: Multi-signal verification with credibility scoring

### vs Time Trackers
- ❌ Time Trackers: Only track duration
- ✅ Our System: Time + interaction + reflection + patterns

## 🧠 Behavioral Intelligence

The system uses rule-based behavioral analysis combined with pattern recognition:

1. **Instant Detection**: Flags completions that happen too quickly
2. **Inactivity Detection**: Monitors tab visibility and interaction gaps
3. **Pattern Analysis**: Identifies robotic or suspicious usage patterns
4. **Quality Assessment**: Evaluates reflection depth and meaningfulness
5. **Consistency Tracking**: Monitors day-of-week patterns and streaks

## 🎓 Use Cases

- **Students**: Preparing for exams with accountability
- **Self-learners**: Building consistent study habits
- **Bootcamp participants**: Staying on track with curriculum
- **Certification prep**: Ensuring genuine learning vs cramming
- **Skill development**: Building long-term knowledge retention

## 🔮 Future Enhancements

- Machine learning for pattern detection
- Spaced repetition integration
- Peer comparison (anonymized)
- Export study reports
- Mobile app version
- Integration with learning platforms

## 📝 License

MIT License - Feel free to use and modify

## 🤝 Contributing

This is a demo/hackathon project showcasing behavior-aware learning systems. Contributions welcome!

---

**Built with the philosophy that genuine learning requires genuine effort, and technology should help verify both.**
