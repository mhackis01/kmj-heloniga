import { DISCORD_CONFIG } from '../config/config.js';

// Function to send message to Discord
export async function sendDiscordMessage(message) {
    try {
        const response = await fetch(DISCORD_CONFIG.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: message,
                username: DISCORD_CONFIG.botName,
                avatar_url: DISCORD_CONFIG.avatarUrl,
            }),
        });

        if (!response.ok) {
            console.error('Failed to send Discord message:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending Discord message:', error);
    }
} 