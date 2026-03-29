# 📸 How to Add Your Screenshots to README

## Quick Steps

1. **Take screenshots** of your app showing the 6 key features
2. **Save them** in the `screenshots/` folder with exact filenames
3. **Commit and push** to GitHub
4. **Done!** They'll appear automatically in README

---

## Screenshot Checklist

Based on the images you showed me, here's what to capture:

### ✅ 1. dashboard.png
**What to capture:** Your first image showing:
- Learning Credibility panel (80% authentic, Low engagement, Low risk)
- Streak: 0 days
- Consistency: 100%
- Tasks Done: 8/22

**How to capture:**
1. Open your app
2. Go to main dashboard
3. Take full-page screenshot
4. Save as `screenshots/dashboard.png`

---

### ✅ 2. content-validation.png
**What to capture:** Your second image showing:
- "NON-EDUCATIONAL CONTENT DETECTED!" warning (red box)
- Video URL input field
- "Start Video Session" button
- Consistency heatmap at bottom
- Learning Mode buttons (Traditional, Video, PDF)

**How to capture:**
1. Try to paste a non-educational video URL
2. Wait for the red warning to appear
3. Take screenshot
4. Save as `screenshots/content-validation.png`

---

### ✅ 3. traditional-timer.png
**What to capture:** Your third image showing:
- "C++ Module 1.1" task
- Timer: 01:45
- Session tasks checklist
- "⚠️ Session Appears Inactive" warning (red box at bottom)
- Tab switches and inactivity indicators

**How to capture:**
1. Start a traditional timer session
2. Wait for inactivity warning to appear (or trigger it)
3. Take screenshot
4. Save as `screenshots/traditional-timer.png`

---

### ✅ 4. presence-check.png
**What to capture:** Your fourth image showing:
- "Active Presence Check" modal
- "What are you currently studying?" question
- Radio button options
- Countdown timer (4s in red)
- "Confirm I'm Studying" button
- Warning at bottom

**How to capture:**
1. Start a session and wait for presence check
2. When modal appears, take screenshot
3. Save as `screenshots/presence-check.png`

---

### ✅ 5. pdf-learning.png
**What to capture:** Your fifth image showing:
- PDF content (OSI Model diagram)
- Page navigation (← Previous, Page 1 of 11, Next →)
- Metrics: Pages Visited (1), Scroll Depth (89%), Interactions (16)
- "End PDF Session" button (red)

**How to capture:**
1. Start PDF learning session
2. Upload a PDF
3. Scroll and interact a bit
4. Take screenshot
5. Save as `screenshots/pdf-learning.png`

---

### ✅ 6. video-learning.png
**What to capture:** Your sixth image showing:
- YouTube video player (C++ tutorial)
- Video controls and progress bar
- Fullscreen button
- Metrics: Completion (4%), Skips (0), Rewinds (0), Pauses (0)
- "End Video Session" button (red)

**How to capture:**
1. Start video learning session
2. Paste educational YouTube URL
3. Let it play for a bit
4. Take screenshot
5. Save as `screenshots/video-learning.png`

---

## How to Save Screenshots

### Option 1: From Your Browser
1. Press `Windows + Shift + S` (Windows) or `Cmd + Shift + 4` (Mac)
2. Select the area to capture
3. Save the image
4. Rename to exact filename (e.g., `dashboard.png`)
5. Move to `screenshots/` folder

### Option 2: Full Page Screenshot
1. Press `F12` to open DevTools
2. Press `Ctrl + Shift + P` (Windows) or `Cmd + Shift + P` (Mac)
3. Type "screenshot"
4. Select "Capture full size screenshot"
5. Save and rename

---

## After Adding All Screenshots

Run these commands:

```bash
# Check what files you added
git status

# Add all screenshots
git add screenshots/

# Commit with message
git commit -m "Add project screenshots for README"

# Push to GitHub
git push origin main
```

---

## Verify Screenshots Appear

1. Go to your GitHub repo: https://github.com/Sapan02206/AI-Learning-Coach
2. Click on `screenshots/` folder
3. You should see all 6 PNG files
4. Go to README.md
5. Scroll to "Screenshots" section
6. Click "📸 Click to view screenshots"
7. All images should display!

---

## Optional: Add Banner Image

Create a nice banner (1200x400px) with:
- Project logo/title
- Tagline: "Verify Genuine Learning Through Behavioral Intelligence"
- Key features or visual elements

Save as `screenshots/banner.png` and it will appear at the top of README!

---

## Need Help?

If images don't appear:
1. Check filenames are EXACTLY as specified (case-sensitive!)
2. Check files are in `screenshots/` folder
3. Check files are PNG format
4. Wait 1-2 minutes for GitHub to process
5. Hard refresh the README page (Ctrl + Shift + R)

---

**That's it! Your README will look amazing with these screenshots! 🎉**
