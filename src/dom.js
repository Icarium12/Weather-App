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


export { form, currentWeatherRender };