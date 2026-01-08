'use client'

import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import ParticlesBackground from '@/components/ParticlesBackground'
import TimerDisplay from '@/components/TimerDisplay'
import ModeSelector from '@/components/ModeSelector'
import Controls from '@/components/Controls'
import SettingsModal from '@/components/SettingsModal'
import CustomTimerModal from '@/components/CustomTimerModal'
import SpotifyPlayer from '@/components/SpotifyPlayer'
import { TimerProvider } from '@/context/TimerContext'
import { SpotifyProvider } from '@/context/SpotifyContext'

export default function Home() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [isCustomTimerOpen, setIsCustomTimerOpen] = useState(false)

    return (
        <TimerProvider>
            <SpotifyProvider>
                <main className="relative min-h-screen w-full overflow-hidden bg-black">
                    {/* Video Background */}
                    <ParticlesBackground />

                    {/* Main Content - Compact and Centered */}
                    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
                        <div className="flex flex-col items-center space-y-8">
                            {/* Mode Selector */}
                            <ModeSelector onCustomClick={() => setIsCustomTimerOpen(true)} />

                            {/* Timer Display */}
                            <TimerDisplay />

                            {/* Controls */}
                            <Controls onSettingsClick={() => setIsSettingsOpen(true)} />
                        </div>
                    </div>

                    {/* Spotify Player */}
                    <SpotifyPlayer />

                    {/* Modals */}
                    <SettingsModal
                        isOpen={isSettingsOpen}
                        onClose={() => setIsSettingsOpen(false)}
                    />

                    <CustomTimerModal
                        isOpen={isCustomTimerOpen}
                        onClose={() => setIsCustomTimerOpen(false)}
                    />

                    {/* Toast Notifications */}
                    <Toaster />
                </main>
            </SpotifyProvider>
        </TimerProvider>
    )
}
