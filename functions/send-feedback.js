const fetch = require('node-fetch');

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: body.content }),
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: 'Failed to send feedback.',
            };
        }

        return {
            statusCode: 200,
            body: 'Feedback sent successfully.',
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: 'Error sending feedback.',
        };
    }
};
