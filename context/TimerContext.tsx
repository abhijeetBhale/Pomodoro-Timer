'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'
import { triggerConfetti } from '@/components/ConfettiEffect'
import { getRandomQuote } from '@/utils/quotes'

type TimerMode = 'pomodoro' | 'short' | 'long' | 'custom'

interface TimerSettings {
    pomodoro: number
    short: number
    long: number
    custom: number
}

interface SoundSettings {
    enabled: boolean
    type: 'bell' | 'chime' | 'ding' | 'gong'
    volume: number
}

interface GeneralSettings {
    theme: 'auto' | 'day' | 'night'
    videoBackground: string
    autoStartBreaks: boolean
    autoStartPomodoros: boolean
    showNotifications: boolean
    showSpotify: boolean
}

interface TimerContextType {
    mode: TimerMode
    isRunning: boolean
    isPaused: boolean
    timeLeft: number
    totalTime: number
    settings: TimerSettings
    soundSettings: SoundSettings
    generalSettings: GeneralSettings
    setMode: (mode: TimerMode) => void
    startTimer: () => void
    pauseTimer: () => void
    restartTimer: () => void
    updateSettings: (settings: Partial<TimerSettings>) => void
    updateSoundSettings: (settings: Partial<SoundSettings>) => void
    updateGeneralSettings: (settings: Partial<GeneralSettings>) => void
    setCustomTime: (minutes: number, seconds: number) => void
}

const TimerContext = createContext<TimerContextType | undefined>(undefined)

export function TimerProvider({ children }: { children: React.ReactNode }) {
    const [mode, setModeState] = useState<TimerMode>('pomodoro')
    const [isRunning, setIsRunning] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [totalTime, setTotalTime] = useState(25 * 60)

    const [settings, setSettings] = useState<TimerSettings>({
        pomodoro: 25,
        short: 5,
        long: 10,
        custom: 15,
    })

    const [soundSettings, setSoundSettings] = useState<SoundSettings>({
        enabled: true,
        type: 'bell',
        volume: 70,
    })

    const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
        theme: 'auto',
        videoBackground: 'auto',
        autoStartBreaks: false,
        autoStartPomodoros: false,
        showNotifications: true,
        showSpotify: true,
    })

    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Load settings from localStorage
    useEffect(() => {
        const savedSettings = localStorage.getItem('timerSettings')
        const savedSoundSettings = localStorage.getItem('soundSettings')
        const savedGeneralSettings = localStorage.getItem('generalSettings')

        if (savedSettings) setSettings(JSON.parse(savedSettings))
        if (savedSoundSettings) setSoundSettings(JSON.parse(savedSoundSettings))
        if (savedGeneralSettings) setGeneralSettings(JSON.parse(savedGeneralSettings))
    }, [])

    // Save settings to localStorage
    useEffect(() => {
        localStorage.setItem('timerSettings', JSON.stringify(settings))
    }, [settings])

    useEffect(() => {
        localStorage.setItem('soundSettings', JSON.stringify(soundSettings))
    }, [soundSettings])

    useEffect(() => {
        localStorage.setItem('generalSettings', JSON.stringify(generalSettings))
    }, [generalSettings])

    // Timer countdown logic
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleTimerComplete()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isRunning, timeLeft])

    const handleTimerComplete = useCallback(() => {
        setIsRunning(false)
        setIsPaused(false)

        // Play notification sound
        if (soundSettings.enabled) {
            playNotificationSound(soundSettings.type, soundSettings.volume)
        }

        // Trigger confetti animation
        triggerConfetti()

        // Show toast notification with motivational quote
        if (generalSettings.showNotifications) {
            const quote = getRandomQuote()
            toast.success(quote, {
                duration: 5000,
                position: 'top-center',
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    fontSize: '16px',
                    fontWeight: '500',
                },
                icon: '🎉',
            })
        }

        // Auto-start next timer
        if (mode === 'pomodoro' && generalSettings.autoStartBreaks) {
            setTimeout(() => {
                setMode('short')
            }, 2000)
        } else if ((mode === 'short' || mode === 'long') && generalSettings.autoStartPomodoros) {
            setTimeout(() => {
                setMode('pomodoro')
            }, 2000)
        }
    }, [mode, soundSettings, generalSettings])

    const setMode = useCallback((newMode: TimerMode) => {
        const switchMode = () => {
            setIsRunning(false)
            setIsPaused(false)
            setModeState(newMode)

            const duration = settings[newMode] * 60
            setTimeLeft(duration)
            setTotalTime(duration)
        }

        if (isRunning) {
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-[#1a1a1a] border border-white/10 shadow-xl rounded-2xl pointer-events-auto flex flex-col p-4 ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 pt-0.5">
                            <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                <span className="text-xl">⚠️</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white">
                                Timer is running
                            </p>
                            <p className="mt-1 text-sm text-gray-400">
                                Do you want to stop the current timer and switch modes?
                            </p>
                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => {
                                        toast.remove(t.id)
                                        switchMode()
                                    }}
                                    className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
                                >
                                    Switch
                                </button>
                                <button
                                    onClick={() => toast.remove(t.id)}
                                    className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ), {
                duration: 4000,
                position: 'top-right',
            })
            return
        }

        switchMode()
    }, [isRunning, settings])

    const startTimer = useCallback(() => {
        setIsRunning(true)
        setIsPaused(false)
    }, [])

    const pauseTimer = useCallback(() => {
        setIsRunning(false)
        setIsPaused(true)
    }, [])

    const restartTimer = useCallback(() => {
        setIsRunning(false)
        setIsPaused(false)
        setTimeLeft(totalTime)
    }, [totalTime])

    const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
        setSettings((prev) => {
            const updated = { ...prev, ...newSettings }

            // Update current timer if not running
            if (!isRunning) {
                const duration = updated[mode] * 60
                setTimeLeft(duration)
                setTotalTime(duration)
            }

            return updated
        })
    }, [mode, isRunning])

    const updateSoundSettings = useCallback((newSettings: Partial<SoundSettings>) => {
        setSoundSettings((prev) => ({ ...prev, ...newSettings }))
    }, [])

    const updateGeneralSettings = useCallback((newSettings: Partial<GeneralSettings>) => {
        setGeneralSettings((prev) => ({ ...prev, ...newSettings }))
    }, [])

    const setCustomTime = useCallback((minutes: number, seconds: number) => {
        const totalSeconds = minutes * 60 + seconds
        setSettings((prev) => ({ ...prev, custom: minutes + seconds / 60 }))
        setModeState('custom')
        setTimeLeft(totalSeconds)
        setTotalTime(totalSeconds)
        setIsRunning(false)
        setIsPaused(false)
    }, [])

    const value: TimerContextType = {
        mode,
        isRunning,
        isPaused,
        timeLeft,
        totalTime,
        settings,
        soundSettings,
        generalSettings,
        setMode,
        startTimer,
        pauseTimer,
        restartTimer,
        updateSettings,
        updateSoundSettings,
        updateGeneralSettings,
        setCustomTime,
    }

    return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

export function useTimer() {
    const context = useContext(TimerContext)
    if (context === undefined) {
        throw new Error('useTimer must be used within a TimerProvider')
    }
    return context
}

// Notification sound function
function playNotificationSound(type: string, volume: number) {
    const audio = new Audio()
    audio.volume = volume / 100

    // Simple beep sound using data URI
    const sounds: Record<string, string> = {
        bell: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnMpBSuBzvLZiTYIGGS56+mjUBELTKXh8bllHAU2jdXzzn0vBSh+zPDajzsKFV+16+yrWBUIQ5zd8sFuJAUuhM/z1YU1Bx1rwO7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+CRVhtuvurVoVCECZ3PLEcSYELIHO8tiJOQcZaLvt559NEAxPpuPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjQGHW/A7eSaSQ0PVqzn77BdGAg+ltrzxnUoBSuBzvLZiTYIGGS56+mjUBELTKXh8bllHAU2jdXzzn0vBSh+zPDajzsKFV+16+yrWBUIQ5zd8sFuJAUuhM/z1YU1Bx1rwO7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+',
        chime: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnMpBSuBzvLZiTYIGGS56+mjUBELTKXh8bllHAU2jdXzzn0vBSh+zPDajzsKFV+16+yrWBUIQ5zd8sFuJAUuhM/z1YU1Bx1rwO7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+CRVhtuvurVoVCECZ3PLEcSYELIHO8tiJOQcZaLvt559NEAxPpuPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjQGHW/A7eSaSQ0PVqzn77BdGAg+ltrzxnUoBSuBzvLZiTYIGGS56+mjUBELTKXh8bllHAU2jdXzzn0vBSh+zPDajzsKFV+16+yrWBUIQ5zd8sFuJAUuhM/z1YU1Bx1rwO7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+',
        ding: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnMpBSuBzvLZiTYIGGS56+mjUBELTKXh8bllHAU2jdXzzn0vBSh+zPDajzsKFV+16+yrWBUIQ5zd8sFuJAUuhM/z1YU1Bx1rwO7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+CRVhtuvurVoVCECZ3PLEcSYELIHO8tiJOQcZaLvt559NEAxPpuPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjQGHW/A7eSaSQ0PVqzn77BdGAg+ltrzxnUoBSuBzvLZiTYIGGS56+mjUBELTKXh8bllHAU2jdXzzn0vBSh+zPDajzsKFV+16+yrWBUIQ5zd8sFuJAUuhM/z1YU1Bx1rwO7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+',
        gong: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnMpBSuBzvLZiTYIGGS56+mjUBELTKXh8bllHAU2jdXzzn0vBSh+zPDajzsKFV+16+yrWBUIQ5zd8sFuJAUuhM/z1YU1Bx1rwO7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+CRVhtuvurVoVCECZ3PLEcSYELIHO8tiJOQcZaLvt559NEAxPpuPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjQGHW/A7eSaSQ0PVqzn77BdGAg+ltrzxnUoBSuBzvLZiTYIGGS56+mjUBELTKXh8bllHAU2jdXzzn0vBSh+zPDajzsKFV+16+yrWBUIQ5zd8sFuJAUuhM/z1YU1Bx1rwO7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+',
    }

    audio.src = sounds[type] || sounds.bell
    audio.play().catch((err) => console.log('Audio play failed:', err))
}
