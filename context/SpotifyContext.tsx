'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

interface SpotifyTrack {
    name: string
    artists: { name: string }[]
    album: { images: { url: string }[] }
    duration_ms: number
}

interface SpotifyContextType {
    isConnected: boolean
    currentTrack: SpotifyTrack | null
    isPlaying: boolean
    progress: number
    connectSpotify: () => void
    disconnectSpotify: () => void
    togglePlayback: () => void
    previousTrack: () => void
    nextTrack: () => void
}

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined)

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || ''
const SPOTIFY_REDIRECT_URI = typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || window.location.origin)
    : ''
const SPOTIFY_SCOPES = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
    const [isConnected, setIsConnected] = useState(false)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)

    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)

    // Handle Spotify callback
    useEffect(() => {
        if (typeof window === 'undefined') return

        const hash = window.location.hash.substring(1)
        const params = new URLSearchParams(hash)
        const token = params.get('access_token')

        if (token) {
            setAccessToken(token)
            setIsConnected(true)
            localStorage.setItem('spotifyToken', token)
            window.history.replaceState({}, document.title, window.location.pathname)
        } else {
            const savedToken = localStorage.getItem('spotifyToken')
            if (savedToken) {
                setAccessToken(savedToken)
                setIsConnected(true)
            }
        }
    }, [])

    // Start polling when connected
    useEffect(() => {
        if (isConnected && accessToken) {
            updateCurrentTrack()
            pollingIntervalRef.current = setInterval(updateCurrentTrack, 3000)
        }

        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current)
            }
        }
    }, [isConnected, accessToken])

    const updateCurrentTrack = useCallback(async () => {
        if (!accessToken) return

        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            if (response.status === 204 || !response.ok) {
                setCurrentTrack(null)
                setIsPlaying(false)
                return
            }

            const data = await response.json()

            if (data && data.item) {
                setCurrentTrack(data.item)
                setIsPlaying(data.is_playing)
                setProgress((data.progress_ms / data.item.duration_ms) * 100)
            }
        } catch (error) {
            console.error('Error fetching Spotify data:', error)
        }
    }, [accessToken])

    const connectSpotify = useCallback(() => {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
            SPOTIFY_REDIRECT_URI
        )}&scope=${encodeURIComponent(SPOTIFY_SCOPES)}`
        window.location.href = authUrl
    }, [])

    const disconnectSpotify = useCallback(() => {
        setIsConnected(false)
        setAccessToken(null)
        setCurrentTrack(null)
        setIsPlaying(false)
        localStorage.removeItem('spotifyToken')

        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
        }
    }, [])

    const togglePlayback = useCallback(async () => {
        if (!accessToken) return

        const endpoint = isPlaying
            ? 'https://api.spotify.com/v1/me/player/pause'
            : 'https://api.spotify.com/v1/me/player/play'

        try {
            await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            setTimeout(updateCurrentTrack, 500)
        } catch (error) {
            console.error('Error toggling playback:', error)
        }
    }, [accessToken, isPlaying, updateCurrentTrack])

    const previousTrack = useCallback(async () => {
        if (!accessToken) return

        try {
            await fetch('https://api.spotify.com/v1/me/player/previous', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            setTimeout(updateCurrentTrack, 500)
        } catch (error) {
            console.error('Error skipping to previous:', error)
        }
    }, [accessToken, updateCurrentTrack])

    const nextTrack = useCallback(async () => {
        if (!accessToken) return

        try {
            await fetch('https://api.spotify.com/v1/me/player/next', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })

            setTimeout(updateCurrentTrack, 500)
        } catch (error) {
            console.error('Error skipping to next:', error)
        }
    }, [accessToken, updateCurrentTrack])

    const value: SpotifyContextType = {
        isConnected,
        currentTrack,
        isPlaying,
        progress,
        connectSpotify,
        disconnectSpotify,
        togglePlayback,
        previousTrack,
        nextTrack,
    }

    return <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
}

export function useSpotify() {
    const context = useContext(SpotifyContext)
    if (context === undefined) {
        throw new Error('useSpotify must be used within a SpotifyProvider')
    }
    return context
}
