# 🍅 Pomodoro Timer - Next.js Edition

A modern, feature-rich Pomodoro Timer built with **Next.js**, **React**, **TypeScript**, and **TailwindCSS**. Features particle.js animations, Spotify integration, and a sleek dark theme.

![Next.js](https://img.shields.io/badge/Next.js-15.1-black)
![React](https://img.shields.io/badge/React-19.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

## ✨ Features

### 🎯 Core Functionality
- **Multiple Timer Modes**: Pomodoro (25min), Short Break (5min), Long Break (10min), Custom
- **Visual Progress Ring**: Animated SVG progress indicator with gradient effects
- **Live Video Backgrounds**: Dynamic video wallpapers that change based on time of day
- **Complete Dark Theme**: Sleek black-based color scheme
- **Keyboard Shortcuts**: Space (start/pause), R (restart), S (settings), ESC (close)

### 🎵 Spotify Integration
- **Full Playback Control**: Play, pause, skip tracks
- **Real-time Updates**: Live track info and progress
- **Global Player**: Bottom-left corner player with album art
- **Easy Authentication**: One-click OAuth connection

### ⚙️ Comprehensive Settings
1. **General**: Spotify connection management
2. **Timers**: Customizable durations for all modes
3. **Sounds**: Multiple notification sounds with volume control
4. **Account**: Theme preferences and auto-start options

### 🎨 Design
- **Dark Theme**: Pure black background with blue accents
- **Particle Effects**: Interactive particle.js animations
- **Smooth Animations**: Fade-ins, slide-ups, and transitions
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- (Optional) Spotify Premium account
- (Optional) Spotify Developer credentials

### Installation

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
npm run build
npm start
```

## 🎵 Spotify Setup

1. **Create Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Add `http://localhost:3000` to Redirect URIs

2. **Add Client ID**
   - Open `context/SpotifyContext.tsx`
   - Replace `YOUR_SPOTIFY_CLIENT_ID` with your Client ID:
   ```typescript
   const SPOTIFY_CLIENT_ID = 'your_actual_client_id_here'
   ```

3. **Connect in App**
   - Open Settings → General
   - Click "Connect Spotify"
   - Authorize the app

## 🎬 Video Backgrounds

The app includes **live video backgrounds** that change based on time of day!

### Current Setup

Videos are stored in `public/videos/` and automatically selected:
- **Day (6 AM - 6 PM)**: Lighter, brighter videos
- **Night (6 PM - 6 AM)**: Darker, atmospheric videos

### Add Your Own Videos

1. Download videos from [MOEWALLS](https://moewalls.com/) or [Wallhaven](https://wallhaven.cc/)
2. Place MP4 files in `public/videos/`
3. Update `components/ParticlesBackground.tsx` to include your videos

**Recommended specs**:
- Format: MP4 (H.264)
- Resolution: 1920x1080
- Size: Under 50 MB
- Duration: 30-60 seconds

See `VIDEO_BACKGROUND_GUIDE.md` for detailed customization options!

## 📁 Project Structure

```
Pomodoro-Timer/
├── app/
│   ├── globals.css          # Global styles and Tailwind
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── ParticlesBackground.tsx
│   ├── ModeSelector.tsx
│   ├── TimerDisplay.tsx
│   ├── Controls.tsx
│   ├── SettingsModal.tsx
│   ├── CustomTimerModal.tsx
│   └── SpotifyPlayer.tsx
├── context/
│   ├── TimerContext.tsx      # Timer state management
│   └── SpotifyContext.tsx    # Spotify integration
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  dark: {
    bg: '#000000',          // Main background
    surface: '#0a0a0a',     // Card backgrounds
    elevated: '#121212',    // Hover states
    border: '#1a1a1a',      // Borders
  },
  accent: {
    primary: '#3b82f6',     // Blue
    secondary: '#8b5cf6',   // Purple
    // Add your custom colors
  },
}
```

### Particle Settings

Edit `components/ParticlesBackground.tsx`:

```typescript
particles: {
  color: {
    value: '#3b82f6',  // Particle color
  },
  number: {
    value: 80,          // Number of particles
  },
  // Customize more options
}
```

### Timer Durations

Edit default values in `context/TimerContext.tsx`:

```typescript
const [settings, setSettings] = useState({
  pomodoro: 25,  // minutes
  short: 5,
  long: 10,
  custom: 15,
})
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Start/Pause timer |
| `R` | Restart timer |
| `S` | Open settings |
| `ESC` | Close modals |

## � Usage Tips

### Pomodoro Technique
1. Choose a task
2. Start 25-minute Pomodoro
3. Work until timer completes
4. Take 5-minute short break
5. After 4 pomodoros, take 10-minute long break

### Best Practices
- � Minimize distractions
- 🎵 Use Spotify for focus music
- ☕ Actually take breaks
- � Track completed pomodoros
- 🎯 One task per session

## � Tech Stack

- **Framework**: Next.js 15.1 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 3.4
- **Animations**: Particles.js (react-tsparticles)
- **State Management**: React Context API
- **Storage**: LocalStorage
- **API**: Spotify Web API

## 📱 Responsive Design

- **Desktop**: Full features, optimal experience
- **Tablet**: Adapted layout, touch-friendly
- **Mobile**: Compact UI, essential features

## 🐛 Troubleshooting

### Build Errors

If you get peer dependency errors:
```bash
npm install --legacy-peer-deps
```

### Particles Not Showing

Make sure you installed all dependencies:
```bash
npm install react-tsparticles tsparticles tsparticles-slim
```

### Spotify Not Working

1. Check Client ID is correct
2. Verify Redirect URI matches exactly
3. Ensure Spotify Premium account
4. Check browser console for errors

### TypeScript Errors

Run type checking:
```bash
npx tsc --noEmit
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically
4. Update Spotify Redirect URI to your domain

### Other Platforms

- **Netlify**: `npm run build` → Deploy `./next` folder
- **Docker**: Create Dockerfile with Node.js base
- **Self-hosted**: `npm run build && npm start`

## 📝 Environment Variables

Create `.env.local` for sensitive data:

```env
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
```

Then use in code:
```typescript
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Particles.js](https://particles.js.org/)

## 🤝 Contributing

Feel free to fork and customize this project!

## � License

MIT License - Free to use for personal and commercial projects

## 🙏 Acknowledgments

- Pomodoro Technique by Francesco Cirillo
- Particle effects by tsParticles
- Icons from Heroicons
- Fonts from Google Fonts

---

**Built with ❤️ using Next.js, React, and TailwindCSS**

Enjoy your productive sessions! 🍅✨
