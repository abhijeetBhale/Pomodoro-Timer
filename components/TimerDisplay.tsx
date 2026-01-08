'use client'

import { useTimer } from '@/context/TimerContext'
import { useEffect, useState } from 'react'

export default function TimerDisplay() {
    const { mode, timeLeft, totalTime } = useTimer()
    const [displayTime, setDisplayTime] = useState('25:00')

    useEffect(() => {
        const minutes = Math.floor(timeLeft / 60)
        const seconds = timeLeft % 60
        const newTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        setDisplayTime(newTime)
    }, [timeLeft])

    // Calculate progress percentage for visual feedback
    const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0

    return (
        <div className="flex flex-col items-center justify-center relative">
            {/* Timer Display - Huge, Clean */}
            <h1
                className={`
                    text-[180px] md:text-[200px] font-bold text-white leading-none tracking-tight
                    transition-all duration-300 ease-out
                    animate-fade-in
                    relative z-10
                `}
                style={{
                    textShadow: '0 0 40px rgba(255, 255, 255, 0.1), 0 0 80px rgba(59, 130, 246, 0.2)',
                }}
            >
                {displayTime}
            </h1>

            {/* Subtle progress indicator */}
            <div className="mt-4 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Mode indicator with smooth fade */}
            <div className="mt-6 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 animate-fade-in">
                <p className="text-white/60 text-sm font-medium uppercase tracking-wider">
                    {mode === 'pomodoro' ? 'Focus Time' :
                        mode === 'short' ? 'Short Break' :
                            mode === 'long' ? 'Long Break' :
                                'Custom Timer'}
                </p>
            </div>
        </div>
    )
}
