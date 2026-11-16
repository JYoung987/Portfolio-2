// ARRAY FOR SETTING UPGRADE VALUES
const UPGRADES = [
    {name: "Auto Clicker",  type: "Auto", cost: 10, level: 0, MaxLevel: 100, upgradeAmount: 0.5, costMultiplier: 1.2, icon: "../Images/Clicker/Gear.png"},
    {name: "Clicker", type: "Clicker", cost: 50, level: 0, MaxLevel: 100, upgradeAmount: 1, costMultiplier: 2, icon: "../Images/Clicker/PointerIcon.png"},
    {name: "Baker", type: "Auto", cost: 250, level: 0, MaxLevel: 100, upgradeAmount: 5, costMultiplier: 1.5, icon:"../Images/Clicker/Baker.png"},
    {name: "Blackjack Table", type: "Unlock", cost: 1000, level: 0, MaxLevel: 1, upgradeAmount: 0, costMultiplier: 1, icon:"../Images/Clicker/Blackjack.png"},
    {name: "Slot Machine", type: "unlock", cost: 10000, level: 0, MaxLevel: 1, upgradeAmount: 0, costMultiplier: 1, icon: null},
]

const upgradeContainer = document.getElementById("UpgradeBox");
let clickStats = document.getElementById("cpcText");
let autoStats = document.getElementById("cpsText");

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

function updateStats() {
    clickStats.textContent = cpc;
    autoStats.textContent = cps.toFixed(1);
}
renderUpgrades();

function incrementCoins() {
    parsedCoin += cpc;
    coin.innerHTML = Math.floor(parsedCoin);
    saveGame();
}

function buyUpgrade(index) 
{
    const upgrade = UPGRADES[index];
    if (upgrade.level < upgrade.MaxLevel)
    {
        if (parsedCoin >= upgrade.cost) 
        {

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
            updateStats();
            saveGame();
        }
    }
}

const TICK = 100;

setInterval(() => {
    if (cps === 0) return;
    parsedCoin += cps * (TICK / 1000);
    coin.innerHTML = Math.floor(parsedCoin);
    saveGame();
}, TICK);


// SAVEDATA //
const SAVE_KEY = "clickerSave";

function saveGame() {
    const save = {
        coins: parsedCoin,
        cpc: cpc,
        cps: cps,
        upgrades: {}
    };

    UPGRADES.forEach(u => {
        save.upgrades[u.name] = { level: u.level, cost: u.cost };
    });

    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

function loadGame() {
    try {
        const save = JSON.parse(localStorage.getItem(SAVE_KEY));
        if (!save) return;

        parsedCoin = save.coins ?? 0;
        cpc = save.cpc ?? 1;
        cps = save.cps ?? 0;

        UPGRADES.forEach(u => {
            const saved = save.upgrades?.[u.name];
            if (saved) {
                u.level = saved.level;
                u.cost = saved.cost;
            }
        });
    } catch (err) {
        console.log("Couldn't load save:", err);
    }
}

loadGame();
coin.innerHTML = Math.floor(parsedCoin);
renderUpgrades();
updateStats();