const narutoTheme = require('../themes/naruto');
const femaleTheme = require('../themes/female');

module.exports = async (sock, msg, args) => {
    const from = msg.key.remoteJid;

    if (args[0] === "naruto") {
        sock.sendMessage(from, {
            image: { url: narutoTheme.image },
            caption: narutoTheme.animeLine,
        });
    } else if (args[0] === "female") {
        sock.sendMessage(from, {
            image: { url: femaleTheme.image },
            caption: femaleTheme.animeLine,
        });
    } else {
        sock.sendMessage(from, { text: "Specify a theme: `naruto` or `female`." });
    }
};