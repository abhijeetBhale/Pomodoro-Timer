import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Pomodoro Timer - Focus & Productivity',
    description: 'A powerful Pomodoro timer with Spotify integration, dynamic backgrounds, and customizable settings to boost your productivity.',
    keywords: ['pomodoro', 'timer', 'productivity', 'focus', 'spotify', 'time management'],
    authors: [{ name: 'Your Name' }],
    viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className} suppressHydrationWarning>{children}</body>
        </html>
    )
}
