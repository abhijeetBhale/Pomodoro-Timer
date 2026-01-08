'use client'

import { useTimer } from '@/context/TimerContext'

interface ModeSelectorProps {
    onCustomClick: () => void
}

export default function ModeSelector({ onCustomClick }: ModeSelectorProps) {
    const { mode, setMode } = useTimer()

    const modes = [
        { id: 'pomodoro' as const, label: 'Pomodoro' },
        { id: 'short' as const, label: 'Short Break' },
        { id: 'long' as const, label: 'Long Break' },
    ]

    const handleModeClick = (modeId: typeof mode) => {
        if (modeId === 'custom') {
            onCustomClick()
        } else {
            setMode(modeId)
        }
    }

    return (
        <div className="flex justify-center gap-3 animate-fade-in">
            {modes.map((m) => (
                <button
                    key={m.id}
                    onClick={() => handleModeClick(m.id)}
                    className={`
                        group relative px-6 py-3 rounded-full font-medium text-sm 
                        transition-all duration-300 overflow-hidden
                        ${mode === m.id
                            ? 'bg-white text-black scale-105 shadow-lg shadow-white/20'
                            : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                        }
                        active:scale-95
                        border border-white/10 hover:border-white/30
                    `}
                >
                    {/* Background shimmer for active mode */}
                    {mode === m.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    )}

                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-2">
                        <span className="uppercase tracking-wide">{m.label}</span>
                    </span>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl" />
                </button>
            ))}
        </div>
    )
}
