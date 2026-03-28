# Troubleshooting Guide

## Common Issues & Solutions

### Build Issues

#### Issue: "storage is not exported"
**Solution**: Already fixed! The import statement now uses named imports:
```javascript
import { savePlan, getPlan, saveTasks, getTasks, saveStats, getStats, clearAll } from './services/storage';
```

#### Issue: Build fails with module errors
**Solution**: 
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Runtime Issues

#### Issue: Trust score not updating
**Cause**: State not being passed correctly
**Solution**: Check that `handleToggleTask` receives `externalStats` parameter

#### Issue: Timer not tracking interactions
**Cause**: Event handlers not firing
**Solution**: Ensure `handleTrackInteraction` is called on user actions

#### Issue: Session summary not showing
**Cause**: `sessionResult` state not set
**Solution**: Verify `setSessionResult` is called after validation

### Data Issues

#### Issue: Lost data after refresh
**Cause**: localStorage not saving
**Solution**: Check browser localStorage is enabled and not full

#### Issue: Tasks not rescheduling
**Cause**: Date comparison logic
**Solution**: Ensure dates are in 'yyyy-MM-dd' format

### UI Issues

#### Issue: Animations not working
**Cause**: CSS classes not applied
**Solution**: Check that `pulse-animation` class is in index.css

#### Issue: Colors not showing correctly
**Cause**: CSS variables not defined
**Solution**: Verify `:root` variables in index.css

## Development Tips

### Testing Enforcement
1. Start a task
2. Wait < 30% of target time
3. Stop timer
4. Should see alert and trust penalty

### Testing Trust Score
1. Complete a task properly (>80% time, good reflection)
2. Trust should increase
3. Try to cheat (instant completion)
4. Trust should decrease

### Testing Recovery Plan
1. Create plan with short deadline
2. Skip several tasks
3. Recovery alert should appear
4. Click "Activate Recovery"
5. Check next 3 days have +30 mins

### Testing Weak Areas
1. Complete multiple sessions
2. Some with low focus scores (<60%)
3. Weak areas panel should appear
4. Shows topics with low averages

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Known Issues
- Backdrop blur may not work in older browsers
- CSS animations may be reduced in low-power mode

## Performance

### If App is Slow
1. Check number of tasks (>100 may slow down)
2. Clear old history data
3. Use production build (`npm run build`)

### Optimization Tips
- Keep history array < 100 entries
- Use React DevTools to check re-renders
- Enable production mode for demos

## Data Management

### Reset Everything
```javascript
// In browser console
localStorage.clear();
location.reload();
```

### Export Data (for backup)
```javascript
// In browser console
const data = {
  plan: localStorage.getItem('ai_coach_plan'),
  tasks: localStorage.getItem('ai_coach_tasks'),
  stats: localStorage.getItem('ai_coach_stats')
};
console.log(JSON.stringify(data, null, 2));
```

### Import Data (restore backup)
```javascript
// In browser console
localStorage.setItem('ai_coach_plan', 'YOUR_PLAN_JSON');
localStorage.setItem('ai_coach_tasks', 'YOUR_TASKS_JSON');
localStorage.setItem('ai_coach_stats', 'YOUR_STATS_JSON');
location.reload();
```

## Demo Preparation

### Before Demo
1. ✅ Clear all data (fresh start)
2. ✅ Test build (`npm run build`)
3. ✅ Test preview (`npm run preview`)
4. ✅ Prepare sample data (subject, deadline)
5. ✅ Test enforcement scenario
6. ✅ Test success scenario

### During Demo
1. Have backup browser tab ready
2. Keep console closed (unless debugging)
3. Use production build for speed
4. Have sample reflection text ready

### After Demo
1. Show code structure if asked
2. Explain trust algorithm
3. Discuss scalability
4. Share GitHub repo

## Quick Fixes

### Trust Score Stuck
```javascript
// Reset trust score to 100
const stats = JSON.parse(localStorage.getItem('ai_coach_stats'));
stats.trustScore = 100;
localStorage.setItem('ai_coach_stats', JSON.stringify(stats));
location.reload();
```

### Streak Not Increasing
**Check**: Trust score must be ≥ 50% for streak to count
**Fix**: Complete tasks properly to increase trust

### Tasks Not Showing
**Check**: Date format in tasks array
**Fix**: Ensure tasks have `date: 'yyyy-MM-dd'` format

### Modal Not Closing
**Check**: `onClose` or `onCancel` prop passed
**Fix**: Verify modal component receives close handler

## Contact & Support

### For Issues
1. Check this troubleshooting guide
2. Review README.md
3. Check browser console for errors
4. Review component code

### For Questions
- Review DEMO_GUIDE.md for usage
- Check FEATURES_SUMMARY.md for details
- Read code comments for logic

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clean build
rm -rf dist
npm run build
```

## Environment

### Required
- Node.js 16+
- npm 7+

### Optional
- VS Code with React extensions
- React DevTools browser extension

## Debugging

### Enable Verbose Logging
Add to components:
```javascript
useEffect(() => {
  console.log('State updated:', { stats, tasks, plan });
}, [stats, tasks, plan]);
```

### Check localStorage
```javascript
// In browser console
console.log('Plan:', localStorage.getItem('ai_coach_plan'));
console.log('Tasks:', localStorage.getItem('ai_coach_tasks'));
console.log('Stats:', localStorage.getItem('ai_coach_stats'));
```

### Monitor Trust Score Changes
Add to `handleValidationSubmit`:
```javascript
console.log('Trust shift:', trustShift);
console.log('New trust score:', newStats.trustScore);
```

---

**Most issues can be resolved by clearing localStorage and starting fresh!**
