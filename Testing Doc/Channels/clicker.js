// ARRAY FOR SETTING UPGRADE VALUES
/* const UPGRADES = [
    {name: "Clicker", startingCost: 10, level: 0, upgradeAmount: 1, costMultiplier: 1.15, icon: "../Images/PointerIcon.png"},
]
const upgradeContainer = document.getElementById("UpgradeBox");
*/

let coin = document.querySelector('.coin-cost');
let parsedCoin = parseFloat(coin.innerHTML);

let clickerCost = document.querySelector('.clicker-cost');
let parsedClickerCost = parseFloat(clickerCost.innerHTML);

let clickerLevel = document.querySelector('.clicker-level');
let clickerIncrease = document.querySelector('.clicker-increase');
let parsedClickerIncrease = parseFloat(clickerIncrease.innerHTML);

let cpc = 1;

function incrementCoins() {
    parsedCoin += cpc;
    coin.innerHTML = parsedCoin;
}

function buyClicker() {
    if (parsedCoin >= parsedClickerCost) {
        parsedCoin -= parsedClickerCost;
        coin.innerHTML = parsedCoin;

        clickerLevel.innerHTML = parseInt(clickerLevel.innerHTML) + 1;

        parsedClickerIncrease *= 1.2;
        clickerIncrease.innerHTML = parsedClickerIncrease;

        parsedClickerCost *= 1.15;
        clickerCost.innerHTML = Math.round(parsedClickerCost);

        cpc = parsedClickerIncrease;
    }
}