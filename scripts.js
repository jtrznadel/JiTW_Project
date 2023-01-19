const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '92cafd2032msh75252a91a66893ap1128bdjsn75fcdc8c70ba',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
	.then(response => response.json())
	.then(response => createCoinsTable(response.data.coins))
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
        <tr id="${element.uuid}" onClick="displayCoinModal(this.id)">
            <td>${element.rank}</td>
            <td><img src="${element.iconUrl}" width="24px" alt="${element.name} icon" > ${element.name}</td>
            <td>${element.symbol}</td>
            <td>${priceFormatted}</td>
            <td><font color=${changeColor}>${element.change}</td>
            <td>${marketCapFormatted}</td>
        </tr>
        `;

        //coinsTableBodyElement.appendChild(coinsTableRowElement);
    });
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

