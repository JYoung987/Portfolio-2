let coin = document.querySelector('.coin-cost')

function incrementCoins() {
    coin.innerHTML = parseFloat(coin.innerHTML) + 1;
}