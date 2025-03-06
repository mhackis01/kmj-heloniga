// Phone Configuration
export const phones = [
    { ip: "10.0.0.45:5800" },
    { ip: "http://100.88.149.67:5800" },
    { ip: "VNC_URL_3" },
    { ip: "VNC_URL_4" },
    { ip: "VNC_URL_5" },
    { ip: "VNC_URL_6" },
    { ip: "VNC_URL_7" },
    { ip: "VNC_URL_8" },
    { ip: "VNC_URL_9" },
    { ip: "VNC_URL_10" }
];

// Task Configuration
export const tasks = [
    {
        id: 1,
        title: "Post on Phone 1",
        subtasks: [
            { id: 1, title: "Scroll on burner account", completed: false },
            { id: 2, title: "Select a tweet with >200k impressions in the last 24 hours", completed: false },
            { id: 3, title: "Clone the tweet and post it on @hotcrashout account", completed: false }
        ]
    },
    {
        id: 2,
        title: "System Check",
        subtasks: [
            { id: 4, title: "Verify all phones are online", completed: false },
            { id: 5, title: "Check network latency", completed: false },
            { id: 6, title: "Test keyboard input", completed: false }
        ]
    },
    {
        id: 3,
        title: "Security Protocol",
        subtasks: [
            { id: 7, title: "Verify firewall settings", completed: false },
            { id: 8, title: "Check VPN connection", completed: false },
            { id: 9, title: "Update security certificates", completed: false }
        ]
    }
];

// Discord Configuration
export const DISCORD_CONFIG = {
    webhookUrl: 'https://discord.com/api/webhooks/1346992349921673266/OMqckaTO-Ynghh-WmRDip9-rotJMo_qLFwrk8ch7nobAncxdlrtBK3a3Nf6i3MHGjkIY',
    botName: 'HELONIGA-1 REPORT BOT',
    avatarUrl: 'https://t3.ftcdn.net/jpg/11/09/77/00/360_F_1109770018_wg08veohSDOxELQeZsVUUeezyzqN6Fk4.jpg'
};

// VPN Configuration
export const VPN_CONFIG = {
    checkUrl: 'http://100.107.14.53:5800',
    checkInterval: 5000 // 5 seconds
}; 