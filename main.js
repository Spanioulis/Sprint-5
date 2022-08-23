"use strict";
/*
- En prémer el botó de “Següent acudit” es farà fetch a l'API d'acudits i es mostrarà per consola l'acudit en qüestió
*/
/*

- La documentació de l'API a consumir és la següent:

https://icanhazdadjoke.com/api

- Crida per a obtenir un acudit:

https://icanhazdadjoke.com/
*/
const API_URL = 'https://icanhazdadjoke.com/';
function tellJoke() {
    fetch(`${API_URL}`, {
        method: 'GET',
        headers: { Accept: 'application/json' }
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data.joke);
        console.log(typeof data.joke);
        // data;
        printJoke(data.joke);
    });
}
function printJoke(joke) {
    // Añadir '!' a final de línea para evitar error "el objeto es posiblemente null .ts(2531)"
    const print = document.getElementById('printJoke');
    print.innerHTML = `${joke}`;
}
