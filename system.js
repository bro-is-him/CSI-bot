const fs = require('fs');

module.exports = async (sock, msg, args) => {
    const from = msg.key.remoteJid;
    const command = args[0];

    if (command === 'uptime') {
        // Show bot's uptime
        const uptime = process.uptime();
        const uptimeMessage = `Bot uptime: ${Math.floor(uptime / 3600)} hours, ${Math.floor((uptime % 3600) / 60)} minutes`;
        sock.sendMessage(from, { text: uptimeMessage });
    } else if (command === 'reload') {
        // Reload the bot (can be useful for changing settings or adding new files without restarting)
        sock.sendMessage(from, { text: "Bot is reloading..." });
        setTimeout(() => {
            process.exit(); // This will terminate the bot, and you can restart it manually.
        }, 2000);
    } else if (command === 'help') {
        // Display all commands available
        const helpMessage = `
Available Commands:
- .fun joke
- .fun fact
- .fun quote
- .utility time
- .utility weather <city>
- .utility currency <amount> <currency_code>
- .system uptime
- .system reload
        `;
        sock.sendMessage(from, { text: helpMessage });
    } else {
        sock.sendMessage(from, { text: "Unknown system command. Use `.help` for available commands." });
    }
};