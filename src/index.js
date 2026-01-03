import { form, currentWeatherRender, forecastRender } from "./dom.js";


(function() {
    const formElements = form();
    console.log(formElements);

    formElements.button.addEventListener('click', (e) => {
        e.preventDefault();
        if (formElements.form.checkValidity()) {
            getWeather(formElements.input.value);
        }
        else {
            formElements.form.reportValidity();
        }
    });
})();

// const formElements = form();

// formElements.button.addEventListener('click', (e) => {
//     e.preventDefault();
//     if (formElements.form.checkValidity()) {
//         getWeather(formElements.input.value);
//     }
//     else {
//         formElements.form.reportValidity();
//     }
// });




async function getWeather(location) {
    try {
        const response =  await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=MWRANT5VCTH4HADC2UXF6RXMB`)
        const weatherData = await response.json();
        console.log(weatherData);
        currentWeather(weatherData);
        currentWeatherRender(weatherData);
        weatherForecast(weatherData);
        forecastRender(weatherData);
        return weatherData;
    } catch (error) {
        console.log(error);
    }
    
}


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

