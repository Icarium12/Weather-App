import "./styles.css"
import { form, currentWeatherRender, forecastRender } from "./dom.js";

function createDivs() {
    const currentDiv = document.createElement("div");
    currentDiv.className = "current"
    const forecastDiv = document.createElement("div");
    const imageDiv = document.createElement("div");

    return {currentDiv, forecastDiv, imageDiv};
}


(function() {
    const formElements = form();
    console.log(formElements);

    formElements.button.addEventListener('click', (e) => {
        e.preventDefault();
        if (formElements.form.checkValidity()) {
            const data = getWeather(formElements.input.value);
            console.log(data);
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

const cont = createDivs();
console.log(cont.currentDiv);



async function getWeather(location) {
    try {
        const response =  await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=MWRANT5VCTH4HADC2UXF6RXMB`)
        const weatherData = await response.json();
        console.log(weatherData);
        currentWeather(weatherData);
        currentWeatherRender(weatherData, cont.currentDiv);
        await getgif(weatherData.currentConditions.conditions, cont.imageDiv);
        weatherForecast(weatherData);
        forecastRender(weatherData, cont.forecastDiv);
        return weatherData;
    } catch (error) {
        console.log(error);
    }
    
}



async function getgif(condition, div) {
    div.replaceChildren();
    const weatherConditon = `${condition} weather`
    console.log(weatherConditon);
    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=CCSHMVOs7eP9uftzXY2EugahbzPBbKyU&s=${weatherConditon}`
        )
        const gifImage = await response.json();
        console.log(gifImage);
        console.log(gifImage.data);
        console.log(gifImage.data.images.original.url);
        const img = document.createElement("img");
        img.src = gifImage.data.images.original.url;
        img.alt = "failed to load image";
        div.appendChild(img);
        document.body.appendChild(div);
    } catch(error) {
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

