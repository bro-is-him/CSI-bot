const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { state, saveState } = useSingleFileAuthState('./auth_info.json');
const fs = require('fs');
const chalk = require('chalk');
const figlet = require('figlet');

// Bot Prefix
const PREFIX = ".";

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.remoteJid === 'status@broadcast') return;

        const from = msg.key.remoteJid;
        const type = Object.keys(msg.message)[0];
        const body = msg.message.conversation || '';

        if (type === 'conversation' && body.startsWith(PREFIX)) {
            const args = body.slice(PREFIX.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            try {
                const commandFile = require(`./commands/${command}.js`);
                commandFile(sock, msg, args);
            } catch (err) {
                sock.sendMessage(from, { text: "Unknown command. Type `.help` for a list of commands." });
            }
        }
    });

    console.log(chalk.green(figlet.textSync('Anime Bot')));
}

startBot();