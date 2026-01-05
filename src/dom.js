function form() {
    const form = document.createElement('form');
    form.noValidate = true;

    const label = document.createElement('label');
    label.textContent = "Please enter location:";
    form.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.addEventListener('input', () => {
        if (input.value === "") {
            input.setCustomValidity("Location is required");
            input.reportValidity();
        }
        else {
            input.setCustomValidity("");
        }
    })
    form.appendChild(input);

    const button = document.createElement("button");
    button.textContent = "Submit";
    form.appendChild(button);
    document.body.appendChild(form);
    return {input, button, form};
}

function currentWeatherRender(data, div) {
    div.replaceChildren();

    const currentTemperature = document.createElement("div");
    currentTemperature.textContent = `Current Temperature: ${data.currentConditions.temp}°F`;
    div.appendChild(currentTemperature);

    const currentCondition = document.createElement("div");
    currentCondition.textContent = `Condition: ${data.currentConditions.conditions}`;
    div.appendChild(currentCondition);

    const currentdescription = document.createElement("div");
    currentdescription.textContent = data.description;
    div.appendChild(currentdescription);

    document.body.appendChild(div);
}

function forecastRender(data, div) {
    const predictions = data.days;
    div.replaceChildren();

    const forecastText = document.createElement("div");
    forecastText.className = "forecast-title";
    forecastText.textContent = "Weather forecast for the next 14 days";
    div.appendChild(forecastText);

    const predictionsCont = document.createElement("div");
    for (let i = 1; i <= predictions.length - 1; i++) {
        const div = document.createElement("div");
        div.className = "predict";

        const date = document.createElement("div");
        date.textContent = `Date: ${predictions[i].datetime}`;
        div.appendChild(date);

        const condition = document.createElement("div");
        condition.textContent = `Conditions: ${predictions[i].conditions}`;
        div.appendChild(condition);

        const temp = document.createElement("div");
        temp.className = "temp";
        temp.textContent = `Temperature: ${[predictions[i].temp]}°F`;
        div.appendChild(temp);

        predictionsCont.appendChild(div);
    }
    div.appendChild(predictionsCont);
    document.body.appendChild(div);

}

function errorRender(div, error) {
    div.replaceChildren();
    div.textContent = error;
    document.body.appendChild(div);
}


export { form, currentWeatherRender, forecastRender, errorRender };