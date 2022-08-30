"use strict";
const API_URL = 'https://icanhazdadjoke.com/';
let firstJoke;
let result;
let form = document.querySelector('#formulario');
function tellJoke() {
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
    console.log(result);
}
function newJoke() {
    // Mostrar mensaje de 'error' si no se ha puntuado el chiste
    if (result === undefined || result === 0) {
        console.log(result);
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
        // Mostrar nuevo 'joke' visualizado y puntuado
        console.log(reportAcudits);
        // Añadir nuevo 'joke' a array conjunta
        reportJokes.push(reportAcudits);
        // Mostrar todos los 'jokes' visualizados y puntuados
        console.log(reportJokes);
        tellJoke();
    }
    // Limpiar formulario
    form.reset();
    // result = 0;
}
