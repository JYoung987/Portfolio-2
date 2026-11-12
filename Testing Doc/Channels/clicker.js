/* const UpgradeData = localStorage.getItem("upgradeData");

function SaveData(){
    const UpgradeSave = localStorage.getItem(UpgradeData)
    localStorage.setItem("UPGRADES", JSON.stringify(UPGRADES));
} */

// ARRAY FOR SETTING UPGRADE VALUES
const UPGRADES = [
    {name: "Auto Clicker",  type: "Auto", cost: 10, level: 0, upgradeAmount: 0.5, costMultiplier: 1.2, icon: "../Images/Clicker/Gear.png"},
    {name: "Clicker", type: "Clicker", cost: 50, level: 0, upgradeAmount: 1, costMultiplier: 2, icon: "../Images/Clicker/PointerIcon.png"},
    {name: "Baker", type: "Auto", cost: 250, level: 0, upgradeAmount: 5, costMultiplier: 1.5, icon:"../Images/Clicker/Baker.png"},
]

const upgradeContainer = document.getElementById("UpgradeBox");
const clickStats = document.getElementById("cpcText");
const autoStats = document.getElementById("cpsText");

let coin = document.querySelector(".coin-cost");
let parsedCoin = parseFloat(coin.innerHTML);

let cpc = 1;
let cps = 0;
let critChance = 1;
let critValue = 2;

function renderUpgrades() {
    upgradeContainer.innerHTML = "";

    UPGRADES.forEach((upgrade, index) => {
        upgradeContainer.innerHTML += `
            <div class="upgrade" onclick="buyUpgrade(${index})">
                <div class="left-section">
                    <img src="${upgrade.icon}" class="pointer-icon">
                </div>

                <div class="center-section">
                    <h4>${upgrade.name}</h4>

                    <div class="cost-info">
                        <p>Cost: <span>${Math.floor(upgrade.cost)}</span></p>
                    </div>
                </div>
                <div class="right-section">
                    Level ${upgrade.level}
                </div>

                <div class="level-info">
                    <p>+${upgrade.upgradeAmount}<br>${upgrade.type === "Auto" ? "Per Second" : "Per Click"}</p>
                </div>
            </div>
        `;
    });
}

renderUpgrades();

function incrementCoins() {
    coin.innerHTML = Math.floor(parseFloat(parsedCoin += cpc));
}

function buyUpgrade(index) {
    const upgrade = UPGRADES[index];

    if (parsedCoin >= upgrade.cost) {

        parsedCoin -= upgrade.cost;
        coin.innerHTML = Math.floor(parsedCoin);
        upgrade.level++;

        if (upgrade.type === "Clicker"){

            cpc += upgrade.upgradeAmount;
        }

        if (upgrade.type === "Auto"){

            cps += upgrade.upgradeAmount;
        }

        upgrade.cost *= upgrade.costMultiplier;

        renderUpgrades();
    }
}

const TICK = 100;

setInterval(() => {
    if (cps === 0) return;
    parsedCoin += cps * (TICK / 1000);
    coin.innerHTML = Math.floor(parsedCoin);
}, TICK);