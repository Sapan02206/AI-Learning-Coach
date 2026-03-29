# Fullscreen & Enhanced Behavioral Tracking

## ✨ New Features Added

### 1. Fullscreen Mode (Both Video & PDF)
- **Fullscreen Button**: Click "⛶ Fullscreen" to enter immersive learning mode
- **Exit Fullscreen**: Click "⊗ Exit Fullscreen" or press ESC key
- **Benefits**: 
  - Eliminates distractions
  - Better focus on content
  - Larger viewing area
  - Professional learning experience

### 2. Enhanced Video Behavioral Tracking

#### Skip Detection
- **What it tracks**: When user jumps forward more than 3 seconds
- **Why it matters**: Indicates content skipping, possible lack of engagement
- **Display**: Shows "Skips" counter (turns red if > 5 skips)
- **Data captured**: Total skip count, time jumped

#### Rewind Detection
- **What it tracks**: When user jumps backward more than 3 seconds
- **Why it matters**: Shows content review, confusion, or seeking clarification
- **Display**: Shows "Rewinds" counter
- **Data captured**: Total rewind count, time rewound

#### Pause Tracking
- **What it tracks**: Every time video is paused
- **Why it matters**: Excessive pauses may indicate distraction or multitasking
- **Display**: Shows "Pauses" counter (turns yellow if > 10 pauses)
- **Data captured**: Total pause count, cumulative pause duration

#### Completion Rate
- **What it tracks**: Percentage of video watched
- **Display**: Real-time completion percentage
- **Color coding**: Shows progress visually

### 3. Enhanced PDF Behavioral Tracking

#### Page Time Tracking
- **What it tracks**: Time spent on each page
- **Display**: Shows "⏱ Xs on this page" in bottom-right corner
- **Why it matters**: Identifies if user is actually reading or just flipping
- **Data captured**: 
  - Time spent per page
  - Number of visits to each page
  - First and last visit timestamps

#### Rapid Page Changes Detection
- **What it tracks**: Page changes faster than 5 seconds
- **Why it matters**: Indicates skimming, not thorough reading
- **Display**: Shows "Rapid Changes" counter (turns red if > 5)
- **Data captured**: Total rapid page changes

#### Multi-Page vs Single-Page Behavior
- **For multi-page PDFs**: Tracks navigation patterns, page revisits
- **For single-page PDFs**: Focuses on scroll depth, time spent, interactions
- **Adaptive tracking**: System adjusts based on PDF length

#### Tab Switching Detection
- **What it tracks**: When user switches away from the PDF tab
- **Why it matters**: Indicates distraction or multitasking
- **Display**: Shows "Tab Switches" counter (turns red if > 3)
- **Data captured**: Total focus loss events

#### Scroll Depth
- **What it tracks**: How far down the page user has scrolled
- **Display**: Shows percentage (0-100%)
- **Why it matters**: Indicates thorough reading vs surface-level viewing

## 📊 Behavioral Metrics Captured

### Video Session Data:
```javascript
{
  type: 'video',
  videoId: 'abc123',
  completionRate: 85,        // % of video watched
  watchTime: 450,            // seconds watched
  playCount: 3,              // times played
  pauseCount: 7,             // times paused
  skipCount: 2,              // forward skips
  rewindCount: 4,            // backward skips
  pauseDuration: 120000,     // total pause time (ms)
  tabSwitches: 1,            // focus loss events
  mouseMovements: 234,       // activity level
  scrollEvents: 45,
  interactionDensity: 12.5   // interactions per minute
}
```

### PDF Session Data:
```javascript
{
  type: 'pdf',
  fileName: 'lecture.pdf',
  totalPages: 10,
  pagesVisited: 8,           // unique pages viewed
  completionRate: 80,        // % of pages visited
  rapidPageChanges: 3,       // quick page flips
  avgTimePerPage: 45,        // seconds per page
  pageTimeTracking: {
    1: { timeSpent: 60000, visits: 2, firstVisit: ..., lastVisit: ... },
    2: { timeSpent: 45000, visits: 1, firstVisit: ..., lastVisit: ... }
  },
  scrollDepth: 95,           // % scrolled
  tabSwitches: 2,            // focus loss
  mouseMovements: 456,
  interactionDensity: 15.2
}
```

## 🎯 How Behavioral Tracking Works

### Video Mode:
1. **Position Tracking**: Monitors video position every second
2. **Skip Detection**: Compares current position with last position
   - If jump > 3 seconds forward → Skip detected
   - If jump > 3 seconds backward → Rewind detected
3. **State Monitoring**: Tracks play/pause state changes
4. **Pause Duration**: Calculates total time video was paused
5. **Tab Monitoring**: Detects when user leaves the tab

### PDF Mode:
1. **Page Timer**: Starts timer when page loads
2. **Page Change Detection**: 
   - Records time spent when changing pages
   - Flags if < 5 seconds (rapid change)
3. **Visit Tracking**: Records each page visit with timestamp
4. **Scroll Monitoring**: Tracks scroll depth percentage
5. **Focus Tracking**: Detects tab switches and window blur

## 🚀 Usage Instructions

### For Video Learning:
1. Click "Video Learning Session"
2. Paste YouTube URL
3. Click "Start Video Session"
4. Click "⛶ Fullscreen" for immersive mode
5. Watch the video naturally
6. System tracks all behaviors automatically
7. Click "End Session" when done

### For PDF Learning:
1. Click "PDF Learning Session"
2. Choose PDF file
3. Click "Start PDF Session"
4. Click "⛶ Fullscreen" for distraction-free reading
5. Navigate pages with Previous/Next buttons
6. System tracks reading patterns automatically
7. Click "End Session" when done

## 📈 Behavioral Insights

### Good Learning Patterns:
- ✅ Low skip count (< 3)
- ✅ Moderate rewinds (shows review)
- ✅ Consistent page time (> 10s per page)
- ✅ High scroll depth (> 80%)
- ✅ Low tab switches (< 2)
- ✅ High interaction density

### Warning Signs:
- ⚠️ High skip count (> 5) - Not watching content
- ⚠️ Rapid page changes (> 5) - Not reading thoroughly
- ⚠️ Low page time (< 5s) - Skimming
- ⚠️ Low scroll depth (< 50%) - Not reading full content
- ⚠️ High tab switches (> 3) - Distracted
- ⚠️ Excessive pauses (> 10) - Multitasking

## 🔍 Real-Time Feedback

### Video Mode Displays:
- Completion percentage (updates every second)
- Skip counter (red if excessive)
- Rewind counter
- Pause counter (yellow if excessive)

### PDF Mode Displays:
- Current page timer (bottom-right)
- Pages visited / Total pages
- Rapid changes counter (red if excessive)
- Scroll depth percentage
- Tab switches (red if excessive)

## 💡 Tips for Best Results

### For Students:
1. Use fullscreen mode to minimize distractions
2. Avoid excessive skipping - watch content fully
3. Take notes during pauses (moderate pausing is okay)
4. Spend adequate time on each PDF page
5. Minimize tab switching
6. Review content by rewinding when needed

### For Educators/Reviewers:
1. Check completion rate (should be > 80%)
2. Review skip/rapid change counts
3. Analyze time-per-page patterns
4. Look for tab switching patterns
5. Check scroll depth for PDFs
6. Compare interaction density across sessions

## 🐛 Troubleshooting

### Fullscreen Not Working:
- **Cause**: Browser security restrictions
- **Fix**: Allow fullscreen permission when prompted
- **Alternative**: Use F11 for browser fullscreen

### Tracking Not Recording:
- **Cause**: Session not started properly
- **Fix**: Ensure you clicked "Start Session" button
- **Check**: Console should show tracking messages

### Video Still Not Visible:
- **Cause**: YouTube API not loaded or invalid URL
- **Fix**: 
  1. Check console for errors
  2. Verify YouTube URL is valid
  3. Try different video
  4. Check internet connection

## 📝 Session Summary Example

After ending a session, data includes:
```
Video Session Summary:
- Duration: 15 minutes
- Completion: 92%
- Skips: 2 (Good!)
- Rewinds: 5 (Shows review)
- Pauses: 4 (Acceptable)
- Tab Switches: 1 (Focused!)
- Engagement Score: 87/100
```

```
PDF Session Summary:
- Duration: 20 minutes
- Pages: 8/10 visited (80%)
- Avg Time/Page: 2.5 minutes
- Rapid Changes: 1 (Good!)
- Scroll Depth: 95% (Thorough!)
- Tab Switches: 0 (Excellent!)
- Reading Score: 92/100
```

## 🎉 Benefits

1. **Objective Learning Metrics**: No self-reporting needed
2. **Real-Time Feedback**: See your behavior as it happens
3. **Distraction-Free**: Fullscreen mode improves focus
4. **Detailed Analytics**: Understand your learning patterns
5. **Accountability**: Harder to fake engagement
6. **Adaptive**: Works for any video length or PDF size
7. **Privacy**: All tracking happens locally in browser

All data is tracked locally and can be used to generate learning reports and improve study habits!
