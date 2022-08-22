/* 
- En prémer el botó de “Següent acudit” es farà fetch a l'API d'acudits i es mostrarà per consola l'acudit en qüestió
*/

/* 

- La documentació de l'API a consumir és la següent:

https://icanhazdadjoke.com/api

- Crida per a obtenir un acudit:

https://icanhazdadjoke.com/
*/

const API_URL: string = 'https://icanhazdadjoke.com/';

function tellJoke() {
    fetch(`${API_URL}`, {
        method: 'GET',
        headers: { accept: 'application/json' }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.joke);
            data;
        });
}
