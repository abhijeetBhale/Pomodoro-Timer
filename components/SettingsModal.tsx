'use client'

import { useState, useEffect } from 'react'
import { useTimer } from '@/context/TimerContext'
import { useSpotify } from '@/context/SpotifyContext'

interface SettingsModalProps {
    isOpen: boolean
    onClose: () => void
}

type Tab = 'general' | 'timers' | 'sounds' | 'themes' | 'account'

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>('general')
    const { settings, soundSettings, generalSettings, updateSettings, updateSoundSettings, updateGeneralSettings } = useTimer()
    const { isConnected, connectSpotify, disconnectSpotify } = useSpotify()

    const [localSettings, setLocalSettings] = useState(settings)
    const [localSoundSettings, setLocalSoundSettings] = useState(soundSettings)
    const [localGeneralSettings, setLocalGeneralSettings] = useState(generalSettings)

    // Sync local state with context when modal opens
    useEffect(() => {
        if (isOpen) {
            setLocalSettings(settings)
            setLocalSoundSettings(soundSettings)
            setLocalGeneralSettings(generalSettings)
        }
    }, [isOpen, settings, soundSettings, generalSettings])

    if (!isOpen) return null

    const handleSave = () => {
        updateSettings(localSettings)
        updateSoundSettings(localSoundSettings)
        updateGeneralSettings(localGeneralSettings)
        onClose()
    }

    const handleReset = () => {
        if (confirm('Reset all settings to default?')) {
            const defaultTimerSettings = {
                pomodoro: 25,
                short: 5,
                long: 10,
                custom: 15,
            }
            const defaultGeneralSettings = {
                theme: 'auto' as const,
                videoBackground: 'auto',
                autoStartBreaks: false,
                autoStartPomodoros: false,
                showNotifications: true,
                showSpotify: true,
            }
            setLocalSettings(defaultTimerSettings)
            setLocalGeneralSettings(defaultGeneralSettings)
            updateSettings(defaultTimerSettings)
            updateGeneralSettings(defaultGeneralSettings)
        }
    }

    // Available video backgrounds - Clean names without emojis
    const videoBackgrounds = [
        { value: 'auto', label: 'Auto (Time-based)', category: 'Auto' },

        // Day Themes
        { value: '/videos/mars-moewalls-com.mp4', label: 'Mars Landscape', category: 'Day' },
        { value: '/videos/classic-console-childhood-gaming-moewalls-com.mp4', label: 'Classic Console Gaming', category: 'Day' },
        { value: '/videos/fantasy-valley-under-swirling-skies-moewalls-com.mp4', label: 'Fantasy Valley', category: 'Day' },
        { value: '/videos/lofi-girl-autumn-afternoon-moewalls-com.mp4', label: 'Lofi Autumn Afternoon', category: 'Day' },
        { value: '/videos/white-tree-sunset-moewalls-com.mp4', label: 'White Tree Sunset', category: 'Day' },
        { value: '/videos/silhouette-samurai-sunset-moewalls-com.mp4', label: 'Samurai Sunset', category: 'Day' },

        // Night Themes
        { value: '/videos/blood-dawn-ghost-of-tsushima-moewalls-com.mp4', label: 'Ghost of Tsushima', category: 'Night' },
        { value: '/videos/valorant-homescreen-moewalls-com.mp4', label: 'Valorant Homescreen', category: 'Night' },
        { value: '/videos/a-cozy-lo-fi-night-for-study-moewalls-com.mp4', label: 'Cozy Lofi Night Study', category: 'Night' },
        { value: '/videos/dark-space-planets-moewalls-com.mp4', label: 'Dark Space Planets', category: 'Night' },
        { value: '/videos/furry-lofi-study-break-moewalls-com.mp4', label: 'Furry Lofi Study Break', category: 'Night' },
        { value: '/videos/lofi-girl-and-cat-watching-fireworks-moewalls-com.mp4', label: 'Lofi Fireworks', category: 'Night' },
        { value: '/videos/symbiote-spider-man-shattered-dimensions-moewalls-com.mp4', label: 'Symbiote Spider-Man', category: 'Night' },
    ]

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-black border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex relative animate-slide-up shadow-2xl shadow-black/50" onClick={(e) => e.stopPropagation()}>
                {/* Close Button - Now inside the modal */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 text-white/50 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left Sidebar */}
                <div className="w-48 border-r border-white/10 p-6 flex flex-col">
                    <div className="space-y-2 flex-1">
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'general' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white/80'
                                }`}
                        >
                            General
                        </button>
                        <button
                            onClick={() => setActiveTab('timers')}
                            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'timers' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white/80'
                                }`}
                        >
                            Timers
                        </button>
                        <button
                            onClick={() => setActiveTab('sounds')}
                            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'sounds' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white/80'
                                }`}
                        >
                            Sounds
                        </button>
                        <button
                            onClick={() => setActiveTab('themes')}
                            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'themes' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white/80'
                                }`}
                        >
                            Themes
                        </button>
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'account' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white/80'
                                }`}
                        >
                            Account
                        </button>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 flex flex-col">
                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-8">
                        {/* General Tab */}
                        {activeTab === 'general' && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-6">General Settings</h2>
                                </div>

                                <div className="flex items-center justify-between py-4">
                                    <div>
                                        <p className="text-white font-medium">Show toast notifications when timer finishes</p>
                                        <p className="text-white/40 text-sm">Displays motivational quotes</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localGeneralSettings.showNotifications}
                                            onChange={(e) => setLocalGeneralSettings({ ...localGeneralSettings, showNotifications: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/40"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between py-4">
                                    <p className="text-white font-medium">Show Spotify player</p>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localGeneralSettings.showSpotify}
                                            onChange={(e) => setLocalGeneralSettings({ ...localGeneralSettings, showSpotify: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/40"></div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Timers Tab */}
                        {activeTab === 'timers' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-6">Timer Durations</h2>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Pomodoro Duration (minutes)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="60"
                                        value={localSettings.pomodoro}
                                        onChange={(e) => setLocalSettings({ ...localSettings, pomodoro: parseInt(e.target.value) || 1 })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Short Break Duration (minutes)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="30"
                                        value={localSettings.short}
                                        onChange={(e) => setLocalSettings({ ...localSettings, short: parseInt(e.target.value) || 1 })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Long Break Duration (minutes)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="60"
                                        value={localSettings.long}
                                        onChange={(e) => setLocalSettings({ ...localSettings, long: parseInt(e.target.value) || 1 })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Sounds Tab */}
                        {activeTab === 'sounds' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-6">Sound Settings</h2>
                                </div>

                                <div className="flex items-center justify-between py-4">
                                    <p className="text-white font-medium">Enable Sound Notifications</p>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localSoundSettings.enabled}
                                            onChange={(e) => setLocalSoundSettings({ ...localSoundSettings, enabled: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/40"></div>
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Notification Sound</label>
                                    <select
                                        value={localSoundSettings.type}
                                        onChange={(e) => setLocalSoundSettings({ ...localSoundSettings, type: e.target.value as 'bell' | 'chime' | 'ding' | 'gong' })}
                                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 [&>option]:bg-black [&>option]:text-white"
                                    >
                                        <option value="bell">Bell</option>
                                        <option value="chime">Chime</option>
                                        <option value="ding">Ding</option>
                                        <option value="gong">Gong</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-2">Volume: {localSoundSettings.volume}%</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={localSoundSettings.volume}
                                        onChange={(e) => setLocalSoundSettings({ ...localSoundSettings, volume: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Themes Tab */}
                        {activeTab === 'themes' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-6">Background Themes</h2>
                                    <p className="text-white/60 text-sm mb-6">Choose a video background for your timer. You can add more videos to the /public/videos folder.</p>
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-3">Select Background:</label>
                                    <select
                                        value={localGeneralSettings.videoBackground}
                                        onChange={(e) => setLocalGeneralSettings({ ...localGeneralSettings, videoBackground: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 [&>option]:bg-black [&>option]:text-white"
                                    >
                                        {videoBackgrounds.map((bg) => (
                                            <option key={bg.value} value={bg.value}>
                                                {bg.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                            </div>
                        )}

                        {/* Account Tab */}
                        {activeTab === 'account' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                                </div>

                                <div className="flex items-center justify-between py-4">
                                    <div>
                                        <p className="text-white font-medium">Auto-start Breaks</p>
                                        <p className="text-white/40 text-sm">Automatically start break timers after Pomodoro</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localGeneralSettings.autoStartBreaks}
                                            onChange={(e) => setLocalGeneralSettings({ ...localGeneralSettings, autoStartBreaks: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/40"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between py-4">
                                    <div>
                                        <p className="text-white font-medium">Auto-start Pomodoros</p>
                                        <p className="text-white/40 text-sm">Automatically start Pomodoro after breaks</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localGeneralSettings.autoStartPomodoros}
                                            onChange={(e) => setLocalGeneralSettings({ ...localGeneralSettings, autoStartPomodoros: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/40"></div>
                                    </label>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <h3 className="text-white font-medium mb-4">Spotify Integration</h3>
                                    {!isConnected ? (
                                        <button
                                            onClick={connectSpotify}
                                            className="w-full px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg font-medium transition-colors"
                                        >
                                            Connect Spotify
                                        </button>
                                    ) : (
                                        <button
                                            onClick={disconnectSpotify}
                                            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            Disconnect Spotify
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Buttons */}
                    <div className="border-t border-white/10 p-6 flex items-center justify-between">
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-full font-medium hover:bg-red-500/10 transition-colors"
                        >
                            Reset all
                        </button>
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-3 bg-white hover:bg-white/90 text-black rounded-full font-medium transition-colors"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
