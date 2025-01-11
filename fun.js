module.exports = async (sock, msg, args) => {
    const from = msg.key.remoteJid;
    const command = args[0];

    if (command === 'joke') {
        // Send a random joke
        sock.sendMessage(from, { text: "Why don't skeletons fight each other? They don't have the guts!" });
    } else if (command === 'fact') {
        // Send a random fact
        sock.sendMessage(from, { text: "Did you know? A day on Venus is longer than a year on Venus!" });
    } else if (command === 'quote') {
        // Send an inspirational quote
        sock.sendMessage(from, { text: "The only way to do great work is to love what you do. - Steve Jobs" });
    } else {
        sock.sendMessage(from, { text: "Unknown fun command. Use `.help` to see available commands." });
    }
};