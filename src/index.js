import "./styles.css"
import { form, currentWeatherRender, forecastRender, errorRender } from "./dom.js";
import loadingImage from "./images/loading.gif";

function createDivs() {
    const currentDiv = document.createElement("div");
    currentDiv.className = "current"
    const forecastDiv = document.createElement("div");
    forecastDiv.className = "forcecast"
    const imageDiv = document.createElement("div");
    imageDiv.className = "img";
    const loadingDiv = document.createElement("div");

    return {currentDiv, forecastDiv, imageDiv, loadingDiv};
}

const cont = createDivs();

(function() {
    const formElements = form();
    document.body.appendChild(cont.loadingDiv);
    formElements.button.addEventListener('click', (e) => {
        e.preventDefault();
        if (formElements.form.checkValidity()) {
            loading(cont.loadingDiv);
            getWeather(formElements.input.value);
        }
        else {
            formElements.form.reportValidity();
        }
    });
})();


async function getWeather(location) {
    try {
        const response =  await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=MWRANT5VCTH4HADC2UXF6RXMB`)
        const weatherData = await response.json();
        currentWeatherRender(weatherData, cont.currentDiv);
        await getgif(weatherData.currentConditions.conditions, cont.imageDiv);
        forecastRender(weatherData, cont.forecastDiv);
        return weatherData;
    } catch (error) {
        console.log(error);
        errorRender(cont.currentDiv, error);
    }
    
}



async function getgif(condition, div) {
    div.replaceChildren();
    const weatherConditon = `${condition} weather`;
    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=CCSHMVOs7eP9uftzXY2EugahbzPBbKyU&s=${weatherConditon}`
        )
        const gifImage = await response.json();
        const img = document.createElement("img");
        img.src = gifImage.data.images.original.url;
        img.alt = "failed to load image";
        div.appendChild(img);
        document.body.appendChild(div);
        cont.loadingDiv.replaceChildren();
    } catch(error) {
        console.log(error);
    }
    
}

function loading(div) {
    div.replaceChildren();
    const img = document.createElement("img");
    img.src = loadingImage;
    div.appendChild(img);
}


// function currentWeather(data) {
//     console.log(`The current temperature is ${data.currentConditions.temp}`);
//     console.log(data.description);
// }

// function weatherForecast(data) {
//     const predictions = data.days;
//     console.log("Weather forecast for the next 14 days");
//     for (let i = 1; i <= predictions.length - 1; i++) {
//         console.log(`Date: ${predictions[i].datetime}  Conditions: ${predictions[i].conditions} Temperature: ${[predictions[i].temp]}`)
//     }
// }

