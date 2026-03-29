# 👀 VISUAL TEST GUIDE

## What You Should See After Opening index.html

### 1️⃣ First Time (Onboarding)
```
┌────────────────────────────────────────────┐
│  🧠 AI Learning Coach                      │
│  Behavior-Aware • Authenticity Tracking   │
├────────────────────────────────────────────┤
│                                            │
│  Let's build your plan                     │
│                                            │
│  What subject do you want to learn?       │
│  [_____________________________]           │
│                                            │
│  When is your goal deadline?              │
│  [_____________________________]           │
│                                            │
│  Daily Mins        Intensity              │
│  [____]            [Medium ▼]             │
│                                            │
│  [Generate Study Plan]                    │
│                                            │
└────────────────────────────────────────────┘
```

### 2️⃣ Dashboard View
```
┌────────────────────────────────────────────┐
│  🧠 AI Learning Coach                      │
├────────────────────────────────────────────┤
│                                            │
│  🛡️ Learning Credibility                  │
│  System confidence: 100% that learning    │
│  is genuine.                              │
│                                            │
│  Authentic: 100%  Engagement: Medium      │
│  Risk Level: Low                          │
│                                            │
├────────────────────────────────────────────┤
│  🔥 Streak: 0 days                        │
│  🎯 Consistency: 100%                     │
│  🏆 Completed: 0/0                        │
├────────────────────────────────────────────┤
│                                            │
│  ▶️ Video Learning Session                │
│  [Paste EDUCATIONAL YouTube URL here...]  │
│  ⚠️ Only educational content allowed      │
│  [Start Video Session]                    │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│  📄 PDF Learning Session                  │
│  [📁 Choose PDF File]                     │
│                                            │
└────────────────────────────────────────────┘
```

### 3️⃣ Video Session Active
```
┌────────────────────────────────────────────┐
│  ▶️ Video Learning Session                │
├────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐ │
│  │                                      │ │
│  │     [YouTube Video Player]           │ │
│  │     (Video playing here)             │ │
│  │                                      │ │
│  │                    [⛶ Fullscreen]   │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Completion: 15%  Skips: 0                │
│  Rewinds: 2       Pauses: 3               │
│                                            │
│  [End Video Session]                      │
└────────────────────────────────────────────┘
```

### 4️⃣ PDF Session Active
```
┌────────────────────────────────────────────┐
│  📄 PDF Learning Session                  │
├────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐ │
│  │ [⛶ Fullscreen]                       │ │
│  │                                      │ │
│  │  [PDF Page Content Rendered Here]   │ │
│  │                                      │ │
│  │                    ⏱ 12s on this page│ │
│  └──────────────────────────────────────┘ │
│                                            │
│  [← Previous]  Page 3/10  [Next →]        │
│                                            │
│  Pages: 5/10      Rapid Flips: 1          │
│  Fast Scroll: 0   Highlights: 3           │
│  Tab Switch: 0                            │
│                                            │
│  [🖍 Highlight Important]                 │
│  [End PDF Session]                        │
└────────────────────────────────────────────┘
```

### 5️⃣ Session Complete Modal
```
┌────────────────────────────────────────────┐
│  ✅ Session Complete!                     │
├────────────────────────────────────────────┤
│                                            │
│  📊 Session Summary                       │
│                                            │
│  Duration: 5.2 minutes                    │
│  Pages Visited: 8/10 (80%)                │
│  Reading Quality: 75/100                  │
│                                            │
│  📈 Behavioral Signals:                   │
│  • Mouse Movements: 234                   │
│  • Scroll Events: 45                      │
│  • Interactions: 12                       │
│  • Focus Lost: 1                          │
│                                            │
│  ⚠️ Penalties Applied:                    │
│  • Rapid page changes: -5 points          │
│                                            │
│  [Close]                                  │
└────────────────────────────────────────────┘
```

---

## 🎬 Video Player - What to Expect

### ✅ WORKING (What you should see):
```
┌─────────────────────────────────────┐
│ ▶️ [Video thumbnail/player]         │
│                                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ ▶️  0:45 / 3:24  🔊 ⚙️ ⛶          │
└─────────────────────────────────────┘
```
- Video thumbnail visible
- Play button works
- Controls visible (play, volume, settings, fullscreen)
- Progress bar shows
- Can click and interact

### ❌ NOT WORKING (What you might have seen before):
```
┌─────────────────────────────────────┐
│                                     │
│         [Black/Empty Box]           │
│                                     │
│                                     │
└─────────────────────────────────────┘
```
- Just a black box
- No controls
- No video thumbnail
- Nothing clickable

---

## 📄 PDF Viewer - What to Expect

### ✅ WORKING (What you should see):
```
┌─────────────────────────────────────┐
│ [⛶ Fullscreen]                     │
│                                     │
│  Chapter 1: Introduction            │
│                                     │
│  Lorem ipsum dolor sit amet,        │
│  consectetur adipiscing elit.       │
│  Sed do eiusmod tempor incididunt   │
│  ut labore et dolore magna aliqua.  │
│                                     │
│                    ⏱ 8s on this page│
└─────────────────────────────────────┘
```
- PDF text visible and readable
- Page content rendered
- Timer counting up
- Fullscreen button visible

### ❌ NOT WORKING (What you might have seen before):
```
┌─────────────────────────────────────┐
│                                     │
│      Loading PDF...                 │
│      Please wait...                 │
│                                     │
└─────────────────────────────────────┘
```
- Stuck on "Loading PDF..."
- No content visible
- Canvas not rendering

---

## 🧪 Testing Checklist

### Video Testing
- [ ] Paste YouTube URL
- [ ] Click "Start Video Session"
- [ ] Video appears and loads
- [ ] Can click play button
- [ ] Audio works
- [ ] Can see video controls
- [ ] Fullscreen button works
- [ ] Stats update (completion, pauses, etc.)
- [ ] Can end session

### PDF Testing
- [ ] Click "Choose PDF File"
- [ ] Select a PDF
- [ ] Click "Start PDF Session"
- [ ] PDF renders on screen
- [ ] Can read the content
- [ ] Previous/Next buttons work
- [ ] Timer counts up
- [ ] Wait 3+ seconds, then highlight works
- [ ] Rapid page flip detected (< 5s)
- [ ] Fullscreen works
- [ ] Can end session
- [ ] Session summary shows penalties

### Anti-Cheat Testing
- [ ] Try non-educational video (e.g., music video)
- [ ] Should show warning
- [ ] Trust score should decrease
- [ ] Video should be blocked

### Behavioral Tracking
- [ ] Mouse movements tracked
- [ ] Scroll events tracked
- [ ] Tab switching detected
- [ ] Short sessions penalized (< 30s)
- [ ] Rapid actions penalized

---

## 🎯 Success Criteria

### You know it's working when:
1. ✅ Video player shows YouTube video
2. ✅ PDF viewer shows PDF content
3. ✅ Fullscreen works for both
4. ✅ Timers count up
5. ✅ Stats update in real-time
6. ✅ Session summaries show data
7. ✅ Penalties applied for bad behavior
8. ✅ Trust score changes based on actions

### You know it's NOT working when:
1. ❌ Black box instead of video
2. ❌ "Loading..." forever for PDF
3. ❌ No controls visible
4. ❌ Can't interact with anything
5. ❌ Console shows errors
6. ❌ Stats don't update

---

## 🔍 Browser Console Check

Open console (F12) and you should see:
```
✓ Video ID set to: dQw4w9WgXcQ
✓ isActive set to: true
✓ Video session ACTIVE
✓ Video ID: dQw4w9WgXcQ
✓ Iframe URL: https://www.youtube.com/embed/dQw4w9WgXcQ
✓ Video should now be visible!
```

If you see errors instead, the fix didn't apply. Try:
1. Hard reload (Ctrl+Shift+R)
2. Clear cache
3. Close and reopen browser

---

**Status**: ✅ Everything should be working now!

Test it and enjoy your fully functional learning coach! 🎉
