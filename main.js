"use strict";
const API_URL = 'https://icanhazdadjoke.com/';
const API_KEY = 'db6704c5b9ee311d621bc22c515c13a6';
const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=${API_KEY}`;
let firstJoke;
let result;
let form = document.querySelector('#formulario');
function getJoke() {
    fetch(`${API_URL}`, {
        method: 'GET',
        headers: { Accept: 'application/json' }
    })
        .then((response) => response.json())
        .then((data) => {
        // Guardar datos en variable
        firstJoke = data.joke;
        // Mostrar en DOM primer 'joke' cargado automáticamente
        const content = document.querySelector('.joke');
        content.innerHTML = `${data.joke}`;
    });
}
const reportJokes = [];
function saveScore(score) {
    result = score;
}
function newJoke() {
    // Mostrar mensaje de 'error' si no se ha puntuado el chiste
    if (result === undefined || result === 0) {
        const alerta = document.querySelector('#error');
        alerta.innerHTML = 'Si no puntúa el chiste, nuestro bot pierde su gracia :S';
        // Eliminar mensaje de error al cabo de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
        return;
    }
    else {
        const date = new Date();
        // Convertir fecha a 'ISOString'
        const dateString = date.toISOString();
        const reportAcudits = {
            joke: firstJoke,
            score: result,
            fecha: dateString
        };
        // Añadir nuevo 'joke' a array conjunta
        reportJokes.push(reportAcudits);
        getJoke();
    }
    // Limpiar formulario
    form.reset();
    result = 0;
}
function getWeather() {
    // Consultar API
    fetch(API_WEATHER)
        // Obtener respuesta
        .then((respuesta) => respuesta.json())
        // Obtener datos
        .then((datos) => {
        // TODO: Añadir Snipper mientras sale Info 'weather'
        // Mostrar datos
        showWeather(datos);
    });
}
function kelvinToCelsius(t) {
    // Convertir a grados Celsius (número con 2 decimales)
    return +(t - 273.15).toFixed(2);
}
function showWeather(datos) {
    //  Extraer datos de 'temperaturas' y 'clima'
    const { weather: { 0: { description } }, main: { temp, temp_max, temp_min } } = datos;
    const actualTemp = kelvinToCelsius(temp);
    const maxTemp = kelvinToCelsius(temp_max);
    const minTemp = kelvinToCelsius(temp_min);
    const content = document.querySelector('.weather');
    content.innerHTML = `
    <p>Good morning Barcelona - Weather: ${description}</p>
    <p>Actual temp: ${actualTemp} &#8451</p>
    <p>(max: ${maxTemp} &#8451 - min: ${minTemp} &#8451)</p>
    `;
}
