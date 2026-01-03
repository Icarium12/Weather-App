async function getWeather(location) {
    try {
        const response =  await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=MWRANT5VCTH4HADC2UXF6RXMB`)
        const weatherData = await response.json();
        console.log(weatherData);
        currentWeather(weatherData);
        weatherForecast(weatherData);
        return weatherData;
    } catch (error) {
        console.log(error);
    }
    
}

const weatherData = getWeather('Benin');

function currentWeather(data) {
    console.log(`The current temperature is ${data.currentConditions.temp}`);
    console.log(data.description);
}

function weatherForecast(data) {
    const predictions = data.days;
    console.log("Weather forecast for the next 14 days");
    for (let i = 1; i <= predictions.length - 1; i++) {
        console.log(`Date: ${predictions[i].datetime}  Conditions: ${predictions[i].conditions} Temperature: ${[predictions[i].temp]}`)
    }
}

