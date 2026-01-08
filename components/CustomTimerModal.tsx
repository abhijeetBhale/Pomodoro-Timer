'use client'

import { useState } from 'react'
import { useTimer } from '@/context/TimerContext'

interface CustomTimerModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function CustomTimerModal({ isOpen, onClose }: CustomTimerModalProps) {
    const [minutes, setMinutes] = useState(15)
    const [seconds, setSeconds] = useState(0)
    const { setCustomTime } = useTimer()

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (minutes === 0 && seconds === 0) {
            alert('Please enter a valid time')
            return
        }
        setCustomTime(minutes, seconds)
        onClose()
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-dark-border">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gradient">Custom Timer</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-dark-elevated rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Minutes
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="120"
                            value={minutes}
                            onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Seconds
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={seconds}
                            onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                            className="input-field"
                        />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                        Set Timer
                    </button>
                </form>
            </div>
        </div>
    )
}
