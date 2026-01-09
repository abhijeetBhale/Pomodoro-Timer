'use client'

import { useEffect, useState } from 'react'
import { useTimer } from '@/context/TimerContext'

// Available videos - organized by theme
const dayVideos = [
  '/videos/mars-moewalls-com.mp4',
  '/videos/classic-console-childhood-gaming-moewalls-com.mp4',
  '/videos/fantasy-valley-under-swirling-skies-moewalls-com.mp4',
  '/videos/lofi-girl-autumn-afternoon-moewalls-com.mp4',
  '/videos/white-tree-sunset-moewalls-com.mp4',
  '/videos/silhouette-samurai-sunset-moewalls-com.mp4',
]

const nightVideos = [
  '/videos/blood-dawn-ghost-of-tsushima-moewalls-com.mp4',
  '/videos/valorant-homescreen-moewalls-com.mp4',
  '/videos/a-cozy-lo-fi-night-for-study-moewalls-com.mp4',
  '/videos/dark-space-planets-moewalls-com.mp4',
  '/videos/furry-lofi-study-break-moewalls-com.mp4',
  '/videos/lofi-girl-and-cat-watching-fireworks-moewalls-com.mp4',
  '/videos/symbiote-spider-man-shattered-dimensions-moewalls-com.mp4',
]

export default function ParticlesBackground() {
  const { generalSettings } = useTimer()
  const [currentVideo, setCurrentVideo] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const videoBackground = generalSettings?.videoBackground || 'auto'

    if (videoBackground === 'auto') {
      // Auto mode: Determine video based on time of day
      const hour = new Date().getHours()
      if (hour >= 6 && hour < 18) {
        setCurrentVideo(dayVideos[Math.floor(Math.random() * dayVideos.length)])
      } else {
        setCurrentVideo(nightVideos[Math.floor(Math.random() * nightVideos.length)])
      }
    } else {
      // User selected a specific video
      setCurrentVideo(videoBackground)
    }
    setIsLoaded(false)
    setHasError(false)
  }, [generalSettings?.videoBackground])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video Background with smooth fade-in */}
      {currentVideo && !hasError && (
        <video
          key={currentVideo}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          onError={() => {
            console.warn('Video failed to load, falling back to gradient background')
            setHasError(true)
          }}
          className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <source src={currentVideo} type="video/mp4" />
        </video>
      )}

      {/* Fallback gradient background when video is not available */}
      {(hasError || !currentVideo) && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      )}

      {/* Dark overlay to maintain readability with smooth transition */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-all duration-700" />

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 transition-all duration-700" />

      {/* Animated glow effects for premium ambiance */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none transition-all duration-1000" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none transition-all duration-1000"
        style={{ animationDelay: '1s' }}
      />
    </div>
  )
}
