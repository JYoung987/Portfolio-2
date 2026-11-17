const GAMES = [
    {name: "Clicker Game", pointsCost: 1000, link: "clicker.html", src: "/Images/Doughnut-icon.png"},
    {name: "Blackjack Game", pointsCost: 1000, link: "blackjack.html", src: "/Images/Blackjackicon.png"},
]

const GamesContainer = document.getElementById("Games");

GAMES.forEach(game => {
    GamesContainer.innerHTML += `
        <div class="game-card">
            <img class="gameLogo" src="${game.src}">
            <h2>${game.name}</h2>
            <p>${game.pointsCost} Points</p>
            <button id="purchasebtn"></button>
        </div>
    `;
});