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

function currentWeatherRender(data) {
    const currentDiv = document.createElement("div");

    const currentTemperature = document.createElement("div");
    currentTemperature.textContent = `Current Temperature: ${data.currentConditions.temp}`;
    currentDiv.appendChild(currentTemperature);

    const currentdescription = document.createElement("div");
    currentdescription.textContent = data.description;
    currentDiv.appendChild(currentdescription);

    document.body.appendChild(currentDiv);
}

function forecastRender(data) {
    const predictions = data.days;
    const forecastDiv = document.createElement("div");

    const forecastText = document.createElement("div");
    forecastText.textContent = "Weather forecast for the next 14 days";
    forecastDiv.appendChild(forecastText);

    const predictionsCont = document.createElement("div");
    for (let i = 1; i <= predictions.length - 1; i++) {
        const div = document.createElement("div");

        const date = document.createElement("div");
        date.textContent = `Date: ${predictions[i].datetime}`;
        div.appendChild(date);

        const condition = document.createElement("div");
        condition.textContent = `Conditions: ${predictions[i].conditions}`;
        div.appendChild(condition);

        const temp = document.createElement("div");
        temp.textContent = `Temperature: ${[predictions[i].temp]}`;
        div.appendChild(temp);

        predictionsCont.appendChild(div);
    }
    forecastDiv.appendChild(predictionsCont);
    document.body.appendChild(forecastDiv);

}


export { form, currentWeatherRender, forecastRender };