console.log("app.js loaded");
let games = [];
let container = document.getElementById("gameContainer");
let search = document.getElementById("search");

let currentCategory = "All";

fetch("data/games.json")
.then(res => res.json())
.then(data => {
    games = data;
    renderGames(games);
})

function renderGames(list) {
    container.innerHTML = "";
    list.forEach(game => {
        container.innerHTML += `<div class="card" onclick="openGame('${game.url}')">
            <img src="${game.thumb}">
            <h3> ${game.title} </h3>
            <p>${game.category}</p>
        </div>`;
    });
}

function openGame(url){
    localStorage.setItem("gameUrl", url);
    window.location.href = "play.html";
}

search.addEventListener("input", () => {
    filterGames();
});

function filterGames(cat) {
    if (cat) {
        currentCategory = cat;
    }

    let value = search.value.toLowerCase();

    let filtered = games.filter(game => {
        let matchsearch = game.title.toLowerCase().includes(value);
        let matchcategory = currentCategory === "All" || game.category === currentCategory;
        return matchsearch && matchcategory;
    });
    renderGames(filtered);
}

function filterCategory(category) {
    filterGames(category);
}