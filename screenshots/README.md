# Screenshots Guide

## How to Add Screenshots

Please save your screenshots with these exact filenames in this folder:

0. **banner.png** (OPTIONAL) - A hero banner image showing:
   - Project logo or title
   - Tagline: "Verify Genuine Learning Through Behavioral Intelligence"
   - Key features or visual representation
   - Recommended size: 1200x400 pixels

1. **dashboard.png** - The main dashboard showing:
   - Learning Credibility panel with trust score (80%)
   - Streak counter (0 days)
   - Consistency score (100%)
   - Tasks done (8/22)

2. **content-validation.png** - Content validation blocking screen showing:
   - "NON-EDUCATIONAL CONTENT DETECTED!" warning
   - Video URL input field
   - "Start Video Session" button
   - Consistency heatmap at bottom

3. **traditional-timer.png** - Traditional timer session showing:
   - "C++ Module 1.1" task
   - Timer showing "01:45"
   - Session tasks checklist
   - "⚠️ Session Appears Inactive" warning
   - Tab switches and inactivity detection

4. **presence-check.png** - Presence check modal showing:
   - "Active Presence Check" title
   - "What are you currently studying?" question
   - Radio button options (Review core concepts, Complete practice exercise, etc.)
   - Countdown timer (4s)
   - "Confirm I'm Studying" button

5. **pdf-learning.png** - PDF learning session showing:
   - PDF content (OSI Model layers diagram)
   - Page navigation (← Previous, Page 1 of 11, Next →)
   - Metrics: Pages Visited (1), Scroll Depth (89%), Interactions (16)
   - "End PDF Session" button

6. **video-learning.png** - Video learning session showing:
   - YouTube video player with C++ tutorial
   - Video controls and progress bar
   - Metrics: Completion (4%), Skips (0), Rewinds (0), Pauses (0)
   - "End Video Session" button

## Image Requirements

- **Format**: PNG (preferred) or JPG
- **Resolution**: At least 1200x675 pixels (16:9 aspect ratio)
- **Quality**: High quality, clear text
- **File Size**: Under 500KB each (optimize if needed)

## After Adding Screenshots

1. Save all 6 images in this folder with exact filenames
2. Commit and push to GitHub:
   ```bash
   git add screenshots/
   git commit -m "Add project screenshots"
   git push origin main
   ```
3. Screenshots will automatically appear in README.md

## Current Status

- [ ] dashboard.png
- [ ] content-validation.png
- [ ] traditional-timer.png
- [ ] presence-check.png
- [ ] pdf-learning.png
- [ ] video-learning.png

Once all screenshots are added, the README will display them automatically!
