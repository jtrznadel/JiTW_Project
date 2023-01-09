const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '01a9eb8ac2mshfc1fe96051fa6d6p128667jsn676cc56de895',
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
		const coinsTableRowElement  = document.createElement("tr");
		 coinsTableRowElement.innerHTML = `
		 <td>${element.rank}</td>
		 <td><img src="${element.iconUrl}" width="24px" alt="${element.name} icon">${element.name}</td>
		 <td>${element.symbol}</td>
		 <td>${parseFloat((element.price)).toLocaleString("en-US", {style:"currency", currency:"USD"})}</td>
		 <td>${element.marketCap}</td>
		 `
		coinsTableBodyElement.appendChild(coinsTableRowElement);
	});
};