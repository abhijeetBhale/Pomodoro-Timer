# 🎬 Video Background Guide

## ✅ Current Setup

Your Pomodoro Timer now has **live video backgrounds** that change based on the time of day!

### 📁 Video Location

All videos are stored in: `public/videos/`

Current videos:
- `blood-dawn-ghost-of-tsushima-moewalls-com.mp4` (65 MB) - Night
- `valorant-homescreen-moewalls-com.mp4` (45 MB) - Night
- `classic-console-childhood-gaming-moewalls-com.mp4` (56 MB) - Day
- `mars-moewalls-com.mp4` (13 MB) - Day
- `Image_Animation_Request_and_Completion.mp4` (2.5 MB)

### ⏰ Time-Based Selection

The app automatically selects videos based on your device time:

- **Day (6 AM - 6 PM)**: Shows lighter/brighter videos
  - Mars landscape
  - Classic gaming console

- **Night (6 PM - 6 AM)**: Shows darker videos
  - Ghost of Tsushima scene
  - Valorant homescreen

### 🎨 Current Features

✅ **Auto-play**: Videos start automatically
✅ **Loop**: Videos repeat seamlessly
✅ **Muted**: No sound to avoid distraction
✅ **Dark Overlay**: 60% black overlay for readability
✅ **Blur Effect**: Slight blur to keep focus on timer
✅ **Responsive**: Covers full screen on all devices
✅ **Random Selection**: Picks randomly from day/night pool

## 🔧 Customization

### Add More Videos

1. Download videos from [MOEWALLS](https://moewalls.com/) or [Wallhaven](https://wallhaven.cc/)
2. Place them in `public/videos/`
3. Update `components/ParticlesBackground.tsx`:

```typescript
// For day videos
const dayVideos = [
  '/videos/mars-moewalls-com.mp4',
  '/videos/classic-console-childhood-gaming-moewalls-com.mp4',
  '/videos/your-new-day-video.mp4',  // Add here
]

// For night videos
const nightVideos = [
  '/videos/blood-dawn-ghost-of-tsushima-moewalls-com.mp4',
  '/videos/valorant-homescreen-moewalls-com.mp4',
  '/videos/your-new-night-video.mp4',  // Add here
]
```

### Change Time Ranges

Edit the time check in `components/ParticlesBackground.tsx`:

```typescript
// Current: Day is 6 AM to 6 PM
if (hour >= 6 && hour < 18) {
  // Day videos
}

// Change to: Day is 7 AM to 7 PM
if (hour >= 7 && hour < 19) {
  // Day videos
}
```

### Adjust Overlay Darkness

In `components/ParticlesBackground.tsx`, modify the overlay:

```typescript
// Current: 60% dark overlay
<div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

// Lighter: 40% dark overlay
<div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

// Darker: 80% dark overlay
<div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
```

### Change Blur Amount

```typescript
// Current: 2px blur
backdrop-blur-[2px]

// More blur (softer background)
backdrop-blur-[4px]

// Less blur (sharper background)
backdrop-blur-[1px]

// No blur
backdrop-blur-none
```

### Use Single Video (No Time-Based)

Replace the entire component logic:

```typescript
export default function ParticlesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        <source src="/videos/your-favorite-video.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
    </div>
  )
}
```

### Add More Time Periods

Create morning/afternoon/evening/night categories:

```typescript
const hour = new Date().getHours()

if (hour >= 6 && hour < 9) {
  // Morning (6-9 AM)
  setCurrentVideo('/videos/sunrise.mp4')
} else if (hour >= 9 && hour < 12) {
  // Late Morning (9 AM-12 PM)
  setCurrentVideo('/videos/morning.mp4')
} else if (hour >= 12 && hour < 15) {
  // Afternoon (12-3 PM)
  setCurrentVideo('/videos/afternoon.mp4')
} else if (hour >= 15 && hour < 18) {
  // Late Afternoon (3-6 PM)
  setCurrentVideo('/videos/sunset.mp4')
} else if (hour >= 18 && hour < 21) {
  // Evening (6-9 PM)
  setCurrentVideo('/videos/evening.mp4')
} else {
  // Night (9 PM-6 AM)
  setCurrentVideo('/videos/night.mp4')
}
```

## 📊 Video Recommendations

### Optimal Settings
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (Full HD)
- **Frame Rate**: 30 FPS
- **File Size**: Under 50 MB for faster loading
- **Duration**: 30-60 seconds (loops seamlessly)

### Best Themes for Focus

**Day Videos**:
- ☀️ Sunny landscapes
- 🌊 Ocean waves
- 🏔️ Mountain views
- 🌸 Nature scenes
- ☁️ Cloudy skies

**Night Videos**:
- 🌙 Starry skies
- 🌃 City lights
- 🌌 Space/nebula
- 🎆 Calm animations
- 🏙️ Neon cityscapes

### Where to Find Videos

1. **MOEWALLS** (https://moewalls.com/)
   - High-quality animated wallpapers
   - Anime and scenic themes
   - Direct MP4 downloads

2. **Wallhaven** (https://wallhaven.cc/)
   - Massive collection
   - Filter by animated
   - Various resolutions

3. **Pexels Videos** (https://www.pexels.com/videos/)
   - Free stock videos
   - Commercial use allowed
   - High quality

4. **Pixabay** (https://pixabay.com/videos/)
   - Free videos
   - No attribution required
   - Good variety

## 🎯 Performance Tips

1. **Optimize File Size**: Keep videos under 50 MB
2. **Use Compression**: Tools like HandBrake can reduce size
3. **Shorter Loops**: 30-60 second videos are ideal
4. **Preload**: Videos load when page loads
5. **Mobile**: Consider lighter videos for mobile users

## 🐛 Troubleshooting

### Video Not Playing

1. Check file is in `public/videos/`
2. Verify file name matches code
3. Ensure MP4 format (H.264 codec)
4. Check browser console for errors

### Video Too Dark/Bright

Adjust the overlay opacity:
- Too dark: Change `bg-black/60` to `bg-black/40`
- Too bright: Change `bg-black/60` to `bg-black/80`

### Video Stuttering

1. Reduce video file size
2. Lower resolution (1080p → 720p)
3. Reduce frame rate (60fps → 30fps)
4. Shorten video duration

### Wrong Video Showing

Check your system time - the app uses device time to determine day/night.

## 💡 Pro Tips

1. **Consistent Theme**: Use videos with similar color palettes
2. **Subtle Motion**: Avoid fast-moving or distracting videos
3. **Dark Overlays**: Keep overlays dark enough for text readability
4. **Test on Mobile**: Ensure videos work on smaller screens
5. **Backup Videos**: Have fallback videos in case one fails to load

---

**Enjoy your dynamic video backgrounds! 🎬✨**
