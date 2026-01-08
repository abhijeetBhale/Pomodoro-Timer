'use client'

import { useTimer } from '@/context/TimerContext'

interface ControlsProps {
    onSettingsClick: () => void
}

export default function Controls({ onSettingsClick }: ControlsProps) {
    const { isRunning, isPaused, startTimer, pauseTimer, restartTimer } = useTimer()

    const handleStartPause = () => {
        if (isRunning) {
            pauseTimer()
        } else {
            startTimer()
        }
    }

    return (
        <div className="flex items-center justify-center gap-4 animate-fade-in">
            {/* Start/Pause Button - Premium Pill Shaped with Shimmer */}
            <button
                onClick={handleStartPause}
                className="
                    group relative px-12 py-4 bg-white text-black rounded-full font-semibold text-lg 
                    transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95
                    hover:shadow-2xl hover:shadow-white/20
                    btn-premium overflow-hidden
                "
            >
                <span className="relative z-10 uppercase tracking-wide">
                    {isRunning ? '⏸ Pause' : isPaused ? '▶ Resume' : '▶ Start'}
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            {/* Restart Button - Circular Icon with Rotation */}
            <button
                onClick={restartTimer}
                className="
                    group w-14 h-14 flex items-center justify-center 
                    bg-white/10 hover:bg-white/20 text-white rounded-full 
                    transition-all duration-300 hover:scale-110 active:scale-95
                    hover:shadow-lg hover:shadow-white/10
                    border border-white/10 hover:border-white/30
                "
                title="Restart Timer"
            >
                <svg
                    className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>

            {/* Settings Button - Circular Icon with Smooth Rotation */}
            <button
                onClick={onSettingsClick}
                className="
                    group w-14 h-14 flex items-center justify-center 
                    bg-white/10 hover:bg-white/20 text-white rounded-full 
                    transition-all duration-300 hover:scale-110 active:scale-95
                    hover:shadow-lg hover:shadow-white/10
                    border border-white/10 hover:border-white/30
                "
                title="Settings"
            >
                <svg
                    className="w-6 h-6 transition-transform duration-500 group-hover:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>
    )
}
