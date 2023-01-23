const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '92cafd2032msh75252a91a66893ap1128bdjsn75fcdc8c70ba',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
	.then(response => response.json())
	.then(response => getDataFromApi(response.data))
	.catch(err => console.error(err));

function createCoinsTable(data){
    const coinsTableBodyElement = document.getElementById("coinsTableBody");
    data.forEach(element => {
        let priceFormatted = parseFloat(element.price).toLocaleString("en-US", {style:"currency", currency:"USD"});
        let marketCapFormatted = parseInt(element.marketCap).toLocaleString("en-US", {style:"currency", currency:"USD"});
        changeColor = element.change > 0 ? "green" : "red";
        //const coinsTableRowElement = document.createElement("tr");
        //coinsTableRowElement.id = element.uuid;
        //coinsTableRowElement.innerHTML = `       
        coinsTableBodyElement.innerHTML += `
        <tr id="${element.uuid}" onClick="displayCoinModal(this.id)" class="coinsRow">
            <td>${element.rank}</td>
            <td><img src="${element.iconUrl}" width="24px" alt="${element.name} icon" > ${element.name}</td>
            <td>${element.symbol}</td>
            <td>${priceFormatted}</td>
            <td><font color=${changeColor}>${element.change}</td>
            <td>${marketCapFormatted}</td>
            <td><i class="fa-solid fa-star"></i></td>
        </tr>`;        //coinsTableBodyElement.appendChild(coinsTableRowElement);
    });
}

function addCoinToFavorites(coinId){

}

function getDataFromApi(data){
    createCoinsTable(data.coins);
    createNavigationBar(data.stats);
}

function createNavigationBar(data){
    const statsBodyElement = document.getElementById("statsBody");
    statsBodyElement.innerHTML += `
        <span class="spanText">Total coins: </span><span id="span_1" class="badge"> ${data.totalCoins}</span>
        <span class="spanText">Total markets: </span><span id="span_2" class="badge">${data.totalMarkets}</span>
        <span class="spanText">Total exchanges: </span><span id="span_3" class="badge">${data.totalExchanges}</span>
        <span class="spanText">Total Market Cap: </span><span id="span_4" class="badge">${data.totalMarketCap}</span>
        <span class="spanText">Total 24h Volume: </span><span id="span_5" class="badge">${data.total24hVolume}</span>
    `
}

function displayCoinModal(coinId){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '01a9eb8ac2mshfc1fe96051fa6d6p128667jsn676cc56de895',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };
    
    fetch('https://coinranking1.p.rapidapi.com/coin/' + coinId + '?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h', options)
        .then(response => response.json())
        .then(response => changeCoinModalData(response.data.coin))
        .catch(err => console.error(err));

    const coinModal = new bootstrap.Modal("#coinModal", {
        keyboard: false
      });
    coinModal.show();
}

function changeCoinModalData(coinData){
    const modalBody = document.getElementById("coinModalBody");
    modalBody.innerHTML = `
        <img src="${coinData.iconUrl}" width="24px" />
    `
    const modalTitle = document.getElementById("coinModalTitle");
    modalTitle.innerHTML = coinData.name;
};

