export const motivationalQuotes = [
    "Great work! Time for a well-deserved break! 🎉",
    "You crushed it! Take a moment to recharge. ⚡",
    "Fantastic focus! Your productivity is on fire! 🔥",
    "Mission accomplished! Time to stretch and relax. 🌟",
    "You're unstoppable! Keep up the amazing work! 💪",
    "Brilliant session! Your dedication is inspiring. ✨",
    "Time's up! You've earned this break, champion! 🏆",
    "Incredible focus! You're making great progress. 🚀",
    "Well done! Every session brings you closer to your goals. 🎯",
    "Amazing effort! Take a breather, you've earned it. 🌈",
    "You're on a roll! Keep this momentum going! 🎊",
    "Superb concentration! Time to rest those brain cells. 🧠",
    "Outstanding work! You're building great habits. 💎",
    "Excellent session! Your future self will thank you. 🌸",
    "You did it! Small steps lead to big achievements. 🌱",
    "Phenomenal focus! Take a break and celebrate! 🎈",
    "Bravo! You're turning time into accomplishments. ⏰",
    "Stellar performance! Rest up for the next round. 🌙",
    "You're a productivity powerhouse! Keep shining! ⭐",
    "Awesome work! Progress over perfection, always. 🎨",
]

export function getRandomQuote(): string {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
}
