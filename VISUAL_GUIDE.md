# Visual Guide - New Features

## 🎬 Video Learning Mode

### Normal View:
```
┌─────────────────────────────────────────────┐
│  🎥 Video Learning Session                  │
├─────────────────────────────────────────────┤
│  ┌───────────────────────────────────────┐  │
│  │                                       │  │
│  │     [⛶ Fullscreen]                   │  │
│  │                                       │  │
│  │        YouTube Video Player           │  │
│  │                                       │  │
│  │                                       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│  │ 85%  │ │  2   │ │  4   │ │  7   │      │
│  │Compl.│ │Skips │ │Rewind│ │Pause │      │
│  └──────┘ └──────┘ └──────┘ └──────┘      │
│                                             │
│  [End Video Session]                        │
└─────────────────────────────────────────────┘
```

### Fullscreen View:
```
┌─────────────────────────────────────────────┐
│                                             │
│  [⊗ Exit Fullscreen]                       │
│                                             │
│                                             │
│                                             │
│         YouTube Video (Full Screen)         │
│                                             │
│                                             │
│                                             │
│                                             │
│              [End Session]                  │
└─────────────────────────────────────────────┘
```

## 📄 PDF Learning Mode

### Normal View:
```
┌─────────────────────────────────────────────┐
│  📄 PDF Learning Session                    │
├─────────────────────────────────────────────┤
│  ┌───────────────────────────────────────┐  │
│  │ [⛶ Fullscreen]                        │  │
│  │                                       │  │
│  │                                       │  │
│  │        PDF Content                    │  │
│  │        (Canvas Rendering)             │  │
│  │                                       │  │
│  │                          ⏱ 45s on page│  │
│  └───────────────────────────────────────┘  │
│                                             │
│  [← Previous]  Page 3 of 10  [Next →]      │
│                                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│  │ 8/10 │ │  3   │ │ 95%  │ │  2   │      │
│  │Pages │ │Rapid │ │Scroll│ │ Tab  │      │
│  └──────┘ └──────┘ └──────┘ └──────┘      │
│                                             │
│  [End PDF Session]                          │
└─────────────────────────────────────────────┘
```

### Fullscreen View:
```
┌─────────────────────────────────────────────┐
│ [⛶ Fullscreen]                              │
│                                             │
│                                             │
│                                             │
│         PDF Content (Full Screen)           │
│                                             │
│                                             │
│                                             │
│                          ⏱ 45s on this page│
│                                             │
│  [← Previous]  Page 3 of 10  [Next →]      │
│              [End Session]                  │
└─────────────────────────────────────────────┘
```

## 📊 Behavioral Tracking Indicators

### Video Metrics:
```
┌─────────────────────────────────────────┐
│  Completion: 85% (Blue - Good!)         │
│  Skips: 2 (Green - Low)                 │
│  Rewinds: 4 (Normal - Shows review)     │
│  Pauses: 7 (Normal)                     │
└─────────────────────────────────────────┘
```

### PDF Metrics:
```
┌─────────────────────────────────────────┐
│  Pages: 8/10 (80% coverage)             │
│  Rapid Changes: 3 (Green - Low)         │
│  Scroll Depth: 95% (Excellent!)         │
│  Tab Switches: 2 (Acceptable)           │
└─────────────────────────────────────────┘
```

## 🎨 Color Coding

### Video Mode:
- **Completion**: Blue (always)
- **Skips**: 
  - Green/White: 0-5 (Good)
  - Red: >5 (Warning - too much skipping)
- **Pauses**: 
  - White: 0-10 (Normal)
  - Yellow: >10 (Warning - too many interruptions)

### PDF Mode:
- **Rapid Changes**: 
  - White: 0-5 (Good)
  - Red: >5 (Warning - not reading thoroughly)
- **Tab Switches**: 
  - White: 0-3 (Good)
  - Red: >3 (Warning - distracted)

## 🔄 User Flow

### Starting Video Session:
```
1. Click "Video Learning Session"
   ↓
2. Paste YouTube URL
   ↓
3. Click "Start Video Session"
   ↓
4. Video loads (see "Loading video player...")
   ↓
5. Video appears
   ↓
6. (Optional) Click "⛶ Fullscreen"
   ↓
7. Watch video (tracking happens automatically)
   ↓
8. Click "End Session" when done
```

### Starting PDF Session:
```
1. Click "PDF Learning Session"
   ↓
2. Click "📁 Choose PDF File"
   ↓
3. Select PDF from computer
   ↓
4. Click "Start PDF Session"
   ↓
5. PDF loads (see "Loading PDF...")
   ↓
6. PDF renders on canvas
   ↓
7. (Optional) Click "⛶ Fullscreen"
   ↓
8. Read PDF (tracking happens automatically)
   ↓
9. Use Previous/Next to navigate
   ↓
10. Click "End Session" when done
```

## 🎯 What Gets Tracked (Visual)

### Video Session Timeline:
```
Time:    0s ──────── 30s ──────── 60s ──────── 90s
Action:  Play ─ Pause ─ Play ─ Skip ─ Rewind ─ Play
Track:   ✓     ✓       ✓      ✓      ✓        ✓
         │     │       │      │      │        │
         └─────┴───────┴──────┴──────┴────────┘
              All behaviors recorded
```

### PDF Session Timeline:
```
Page:    1 ────── 2 ────── 3 ────── 2 ────── 4
Time:    60s      45s      10s      30s      50s
Track:   ✓        ✓        ✓        ✓        ✓
         │        │        │        │        │
         Good     Good     Rapid!   Revisit  Good
```

## 💡 Quick Tips

### For Maximum Focus:
1. ✅ Use fullscreen mode
2. ✅ Close other tabs
3. ✅ Turn off notifications
4. ✅ Use headphones for video
5. ✅ Take notes during pauses

### For Best Tracking Results:
1. ✅ Watch videos at normal speed
2. ✅ Spend adequate time on each PDF page
3. ✅ Minimize tab switching
4. ✅ Scroll through entire PDF pages
5. ✅ Complete full sessions

## 🚨 Warning Indicators

### You'll see warnings when:
- 🔴 Skip count turns red (>5 skips)
- 🟡 Pause count turns yellow (>10 pauses)
- 🔴 Rapid changes turn red (>5 quick flips)
- 🔴 Tab switches turn red (>3 switches)

These indicate potential issues with engagement or focus!

## ✅ Success Indicators

### Good session looks like:
- ✅ High completion rate (>80%)
- ✅ Low skip count (<3)
- ✅ Moderate rewinds (shows review)
- ✅ Reasonable pauses (<10)
- ✅ Good time per page (>10s)
- ✅ Low rapid changes (<3)
- ✅ High scroll depth (>80%)
- ✅ Minimal tab switches (<2)

## 🎓 Example Session

### Good Video Session:
```
Duration: 15 minutes
Completion: 95% ✅
Skips: 1 ✅
Rewinds: 3 ✅ (reviewed content)
Pauses: 5 ✅ (took notes)
Tab Switches: 0 ✅
Score: 92/100 🎉
```

### Good PDF Session:
```
Duration: 20 minutes
Pages: 9/10 ✅
Avg Time/Page: 2.2 min ✅
Rapid Changes: 2 ✅
Scroll Depth: 92% ✅
Tab Switches: 1 ✅
Score: 89/100 🎉
```

All features are now live and ready to use! 🚀
