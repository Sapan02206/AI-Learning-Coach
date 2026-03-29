# Quick Test Guide - Video & PDF Features

## 🎯 What Was Fixed

Both the YouTube video player and PDF viewer were not rendering content properly. They now have:
- ✅ Better error handling
- ✅ Loading state indicators  
- ✅ Proper timing/initialization
- ✅ Console debugging messages
- ✅ User-friendly error alerts

## 🧪 How to Test

### 1. Open the App
```bash
# Just open index.html in your browser
# Or if you have a local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

### 2. Test Video Mode

1. **Open Browser DevTools** (Press F12)
2. Go to **Console** tab
3. In the app, click **"Video Learning Session"**
4. Paste a YouTube URL, for example:
   - `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - `https://www.youtube.com/watch?v=jNQXAC9IVRw`
5. Click **"Start Video Session"**
6. **Watch the Console** - you should see:
   ```
   YouTube IFrame API loaded
   Initializing YouTube player with video ID: ...
   YouTube player ready and loaded successfully
   ```
7. **Video should appear** and be playable
8. Try playing/pausing to test tracking

**If it fails:**
- Check console for error messages
- Try a different YouTube URL
- Check your internet connection
- Make sure YouTube isn't blocked

### 3. Test PDF Mode

1. **Keep DevTools Console open** (F12)
2. Click **"PDF Learning Session"**
3. Click **"Choose PDF File"**
4. Select any PDF file from your computer
5. Click **"Start PDF Session"**
6. **Watch the Console** - you should see:
   ```
   Loading PDF.js library...
   PDF.js library loaded successfully
   Starting PDF file read...
   PDF file read complete, parsing document...
   PDF document loaded, pages: X
   Rendering PDF page: 1
   PDF page rendered successfully
   ```
7. **PDF should render** on the canvas
8. Try clicking **Previous/Next** buttons to navigate pages

**If it fails:**
- Check console for specific error messages
- Try a smaller/simpler PDF file
- Make sure the PDF isn't corrupted
- Check your internet connection (PDF.js loads from CDN)

## 🔍 What to Look For

### Success Indicators:
- ✅ Video player shows YouTube video
- ✅ PDF canvas shows actual PDF content
- ✅ Console shows success messages
- ✅ No error alerts pop up
- ✅ Loading states appear briefly then disappear

### Failure Indicators:
- ❌ Blank/black video player area
- ❌ "Loading PDF..." message never goes away
- ❌ Error messages in console (red text)
- ❌ Alert popups with error messages
- ❌ Canvas stays empty

## 🐛 Common Issues

### "Failed to load YouTube player"
- **Cause:** Network issue or YouTube API blocked
- **Fix:** Check internet, try different network, check firewall

### "Failed to load PDF viewer"
- **Cause:** PDF.js CDN not accessible
- **Fix:** Check internet connection, try different network

### "Error loading PDF"
- **Cause:** Invalid/corrupted PDF file
- **Fix:** Try a different PDF file

### Video/PDF loads but doesn't track properly
- **Cause:** Behavioral tracking not initialized
- **Fix:** Check console for tracking-related errors

## 📊 Expected Console Output

### Successful Video Load:
```
YouTube IFrame API loaded
Initializing YouTube player with video ID: dQw4w9WgXcQ
YouTube player ready and loaded successfully
```

### Successful PDF Load:
```
Loading PDF.js library...
PDF.js library loaded successfully
Starting PDF file read...
PDF file read complete, parsing document...
PDF document loaded, pages: 5
Rendering PDF page: 1
PDF page rendered successfully
```

## 🎉 Success Criteria

Both features are working if:
1. ✅ Video plays in the YouTube player
2. ✅ PDF renders on canvas and you can see the content
3. ✅ Page navigation works for PDF
4. ✅ Play/pause tracking works for video
5. ✅ No errors in console
6. ✅ Session data is tracked (interactions, time, etc.)

## 📝 Report Issues

If something still doesn't work:
1. Copy the **entire console output** (especially errors in red)
2. Note which feature failed (Video or PDF)
3. Note what you were doing when it failed
4. Share the error messages

The console logs will help identify exactly where the issue is occurring!
