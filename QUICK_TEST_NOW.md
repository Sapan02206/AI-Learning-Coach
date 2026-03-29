# 🚀 Quick Test Guide - Try These Now!

## ✅ What's Fixed & New

### Video Player:
- ✅ **NOW VISIBLE** with audio and all controls
- ✅ **Anti-cheat** system blocks non-educational content
- ✅ **Penalty** system reduces trust score for cheating

### PDF Reader:
- ✅ **Highlighting** feature with smart validation
- ✅ **Rapid scroll** detection
- ✅ **Reading quality** scoring

## 🎬 Test Video Mode

### Test 1: Educational Video (Should Work)
```
1. Open index.html
2. Click "Video Learning Session"
3. Paste: https://www.youtube.com/watch?v=rfscVS0vtbw
   (Python Tutorial)
4. Click "Start Video Session"
5. Wait 3-5 seconds
6. ✓ Video should appear with controls
7. ✓ You should see play button, volume, quality controls
8. ✓ Click play - audio should work
9. ✓ Try fullscreen button
```

### Test 2: Non-Educational Video (Should Block)
```
1. Click "Video Learning Session"
2. Paste: https://www.youtube.com/watch?v=dQw4w9WgXcQ
   (Music video)
3. Click "Start Video Session"
4. ✓ Should show RED warning
5. ✓ Alert popup about cheating
6. ✓ Video should NOT load
7. ✓ Trust score reduced by 10%
```

### Test 3: Video Behavioral Tracking
```
1. Start educational video
2. Let it play for 10 seconds
3. Skip forward (drag progress bar)
4. ✓ Skip counter should increase
5. Skip backward
6. ✓ Rewind counter should increase
7. Pause video
8. ✓ Pause counter should increase
9. Check completion percentage
10. ✓ Should update every second
```

## 📄 Test PDF Mode

### Test 1: Basic PDF Reading
```
1. Click "PDF Learning Session"
2. Choose any PDF file
3. Click "Start PDF Session"
4. Wait for PDF to render
5. ✓ PDF should appear on canvas
6. ✓ Page timer should show "⏱ 0s on this page"
7. Wait 10 seconds
8. ✓ Timer should update to "⏱ 10s on this page"
9. Click "Next" button
10. ✓ Timer should reset to 0s
```

### Test 2: Highlighting Feature
```
1. Start PDF session
2. Wait only 2 seconds
3. Click "🖍 Highlight Important"
4. ✓ Should show alert: "Please read before highlighting!"
5. Wait 5+ seconds
6. Click "🖍 Highlight Important" again
7. ✓ Button should turn green briefly
8. ✓ Highlight counter should show "1"
9. Repeat on different pages
10. ✓ Counter should increase
```

### Test 3: Rapid Scrolling Detection
```
1. Start PDF session
2. Scroll VERY FAST through the page
3. ✓ "Fast Scroll" counter should increase
4. ✓ Counter turns RED if > 5
5. Scroll slowly
6. ✓ Counter should not increase
```

### Test 4: Rapid Page Changes
```
1. Start PDF session
2. Click "Next" immediately (< 5 seconds)
3. ✓ "Rapid Flips" counter should increase
4. ✓ Console shows "Rapid page change detected"
5. Wait 10+ seconds on a page
6. Click "Next"
7. ✓ Counter should NOT increase
```

## 📊 Check Session Data

### After Video Session:
```
Open browser console (F12)
Look for session data:
- completionRate: Should show percentage
- skipCount: Number of forward skips
- rewindCount: Number of backward skips
- pauseCount: Number of pauses
- cheatingAttempts: Should be 0 for educational, 1 for non-educational
```

### After PDF Session:
```
Open browser console (F12)
Look for session data:
- highlights: Number of highlights
- highlightQuality: Percentage (higher is better)
- rapidPageChanges: Number of quick flips
- rapidScrollCount: Number of fast scrolls
- readingQualityScore: 0-100 (higher is better)
```

## 🎯 Expected Results

### Good Video Session:
```
✓ Video visible and playing
✓ Audio working
✓ Controls functional
✓ Completion: 85%+
✓ Skips: < 3
✓ Rewinds: 2-5
✓ Pauses: < 10
✓ No cheating attempts
```

### Good PDF Session:
```
✓ PDF rendered clearly
✓ Highlights: 5-10
✓ Highlight Quality: 80%+
✓ Rapid Flips: < 3
✓ Fast Scrolls: < 3
✓ Reading Quality: 85%+
✓ Time per page: 15s+
```

### Bad Behavior Detected:
```
✗ Non-educational video → RED warning
✗ Rapid highlighting → Alert shown
✗ Fast scrolling → Counter turns RED
✗ Quick page flips → Counter turns RED
✗ Tab switching → Counter turns RED
```

## 🐛 Troubleshooting

### Video Not Showing:
1. Open Console (F12)
2. Look for errors
3. Check: "YouTube IFrame API loaded"
4. Check: "Initializing YouTube player"
5. Wait 5-10 seconds
6. Try different video URL

### PDF Not Rendering:
1. Open Console (F12)
2. Look for: "PDF.js library loaded"
3. Look for: "PDF document loaded"
4. Look for: "Rendering PDF page"
5. Try smaller PDF file
6. Check internet connection

### Highlighting Not Working:
1. Make sure PDF is loaded
2. Wait at least 3 seconds on page
3. Then click highlight button
4. Check console for messages

## 📱 Quick Commands

### Open Console:
- Windows/Linux: `Ctrl + Shift + J`
- Mac: `Cmd + Option + J`

### Reload Page:
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### Exit Fullscreen:
- Press `ESC` key
- Or click "⊗ Exit Fullscreen" button

## ✅ Success Checklist

Video Mode:
- [ ] Video loads and is visible
- [ ] Audio plays
- [ ] Controls work
- [ ] Educational video allowed
- [ ] Non-educational blocked
- [ ] Warning shown for cheating
- [ ] Skip detection works
- [ ] Rewind detection works
- [ ] Pause tracking works
- [ ] Fullscreen works

PDF Mode:
- [ ] PDF renders
- [ ] Page timer updates
- [ ] Highlight button works
- [ ] Rapid highlight blocked
- [ ] Highlight counter updates
- [ ] Fast scroll detected
- [ ] Rapid page change detected
- [ ] Reading quality calculated
- [ ] Fullscreen works
- [ ] Page navigation works

## 🎉 You're Ready!

All features are working. Test them now and see the behavioral tracking in action!

**Pro Tip**: Keep the browser console open (F12) to see all the tracking messages and debug any issues.
