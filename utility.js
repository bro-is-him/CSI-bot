const axios = require('axios');

module.exports = async (sock, msg, args) => {
    const from = msg.key.remoteJid;
    const command = args[0];

    if (command === 'time') {
        // Send the current time
        const currentTime = new Date().toLocaleTimeString();
        sock.sendMessage(from, { text: `The current time is: ${currentTime}` });
    } else if (command === 'weather' && args[1]) {
        // Check the weather for a city
        const city = args[1];
        const apiKey = 'YOUR_WEATHER_API_KEY'; // Replace with your weather API key
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(weatherUrl);
            const weather = response.data;
            const weatherInfo = `Weather in ${city}: ${weather.weather[0].description}, Temperature: ${weather.main.temp}°C`;
            sock.sendMessage(from, { text: weatherInfo });
        } catch (error) {
            sock.sendMessage(from, { text: "Could not fetch weather data. Please try again later." });
        }
    } else if (command === 'currency' && args[1] && args[2]) {
        // Convert currency using a fixed rate for simplicity
        const amount = parseFloat(args[1]);
        const fromCurrency = args[2].toUpperCase();
        const toCurrency = 'USD';  // Example: Convert to USD (you can extend this for more currencies)
        const conversionRate = 1.2; // Example rate for simplicity
        
        const convertedAmount = amount * conversionRate;
        sock.sendMessage(from, { text: `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}` });
    } else {
        sock.sendMessage(from, { text: "Unknown utility command. Use `.help` for available commands." });
    }
};