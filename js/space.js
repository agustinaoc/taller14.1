let NASACollection = [];
function getData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            NASACollection = data.collection; //Guarda los elementos en un array
            showData(NASACollection);
        })
        .catch(error => {
            console.error('Error:', error)
        })
}

function showData(array) {
    let infoContainer = document.getElementById("contenedor");
    infoContainer.innerHTML = "";
    for (let i = 0; i < array.items.length; i++) {

        if (array.items[i] && array.items[i].links) {

            const { links: [{ href }], data: [{ title, description, date_created }] } = array.items[i];

            infoContainer.innerHTML += `
        <div class="card col-9 col-md-3 col-sm-5 m-1">
            <img src="${href}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description || "No hay descripción."}</p>
                <p class="date">${date_created}</p>
            </div>
        </div>`;
        }
    }
}

const btnBuscar = document.getElementById("btnBuscar");

document.addEventListener("DOMContentLoaded", () => {
    btnBuscar.addEventListener("click", () => {
        const input = document.getElementById("inputBuscar").value;
        const NASA_URL = "https://images-api.nasa.gov/search?q=" + input;
        getData(NASA_URL);
    })
});