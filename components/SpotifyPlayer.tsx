'use client'

import { useSpotify } from '@/context/SpotifyContext'
import { useTimer } from '@/context/TimerContext'
import Image from 'next/image'
import { useState } from 'react'

export default function SpotifyPlayer() {
    const { isConnected, currentTrack, isPlaying, togglePlayback, previousTrack, nextTrack, connectSpotify } = useSpotify()
    const { generalSettings } = useTimer()

    // Don't show if user disabled Spotify in settings
    if (!generalSettings.showSpotify) {
        return null
    }

    // Don't show if Spotify Client ID is not configured
    const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    if (!spotifyClientId) {
        return null
    }

    if (!isConnected) {
        // Show connect banner
        return (
            <div className="fixed top-6 right-6 z-40">
                <button
                    onClick={connectSpotify}
                    className="flex items-center gap-3 px-4 py-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg hover:bg-black/90 transition-all group"
                >
                    <svg className="w-5 h-5 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    <span className="text-white text-sm font-medium">Connect Spotify</span>
                </button>
            </div>
        )
    }

    if (!currentTrack) {
        return null
    }

    return (
        <div className="fixed top-6 right-6 z-40">
            <div className="flex items-center gap-3 px-3 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg min-w-[380px]">
                {/* Album Art */}
                <div className="relative w-14 h-14 rounded overflow-hidden flex-shrink-0">
                    <Image
                        src={currentTrack.album.images[0]?.url || '/placeholder-album.png'}
                        alt="Album Art"
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                        <span className="text-white/60 text-xs">for study, chill, and more</span>
                        <span className="text-white/40 text-xs">· Flo...</span>
                    </div>
                    <h3 className="text-white text-sm font-medium truncate">
                        {currentTrack.name}
                    </h3>
                    <p className="text-white/60 text-xs truncate">
                        {currentTrack.artists.map((a) => a.name).join(', ')}
                    </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Preview Button */}
                    <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded border border-white/20 transition-colors">
                        Preview
                    </button>

                    {/* Previous */}
                    <button
                        onClick={previousTrack}
                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                        title="Previous"
                    >
                        <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                        </svg>
                    </button>

                    {/* Next */}
                    <button
                        onClick={nextTrack}
                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                        title="Next"
                    >
                        <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                        </svg>
                    </button>

                    {/* Add Button */}
                    <button className="p-1.5 hover:bg-white/10 rounded transition-colors" title="Add to playlist">
                        <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>

                    {/* More Options */}
                    <button className="p-1.5 hover:bg-white/10 rounded transition-colors" title="More options">
                        <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </button>

                    {/* Play/Pause */}
                    <button
                        onClick={togglePlayback}
                        className="p-2 bg-white hover:bg-white/90 rounded-full transition-all ml-1"
                        title={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    {/* Spotify Logo */}
                    <svg className="w-6 h-6 text-[#1DB954] ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
