let heroes = [];
let tableData = "";

const heroesListElement = document.querySelector("#heroes-list");
const heroesInputElement = document.querySelector("#heroes-input");
const tableBodyElement = document.querySelector("#table-body");

function fetchHeroes() {
    fetch("https://indonesia-public-static-api.vercel.app/api/heroes")
    .then((response) => response.json())
    .then((data) => {
        heroes = data;
        heroes.sort((a, b) => (a.name > b.name) ? 1 : -1);
        loadData(heroes, heroesListElement);
        loadTableData(heroes, tableBodyElement);
    })
}

function loadData(data, element) {
    if (data) {
        element.innerHTML = "";
        let innerElement = "";
        data.forEach((item) => {
            innerElement += `<li>${item.name}</li>`;
        });
        element.innerHTML = innerElement;
        let listElements = element.getElementsByTagName("li");
        for (let i = 0; i < listElements.length; i++) {
            listElements[i].addEventListener("click", function() {
                heroesInputElement.value = this.textContent;
                const filteredData = filterData(heroes, heroesInputElement.value);
                loadData(filteredData, heroesListElement);
                loadTableData(filteredData, tableBodyElement);
            });
        }
    }
}

function loadTableData(data, element) {
    if (data) {
        element.innerHTML = "";
        let innerElement = "";
        data.forEach((item) => {
            innerElement += `
            <tr>
                <td>${item.name}</td>
                <td>${item.birth_year}</td>
                <td>${item.death_year}</td>
                <td>${item.ascension_year}</td>
                <td>${item.description}</td>
            </tr>
            `;
        });
        element.innerHTML = innerElement;
    }
}

function filterData(data, searchText) {
    return data.filter((x) => x.name.toLowerCase().includes(searchText.toLowerCase()));
}

fetchHeroes();

heroesInputElement.addEventListener("input", function() {
    const filteredData = filterData(heroes, heroesInputElement.value);
    loadData(filteredData, heroesListElement);
    if (heroesInputElement.value) {
        loadTableData(filteredData, tableBodyElement);
    } else {
        loadTableData(heroes, tableBodyElement);
    }    
});
