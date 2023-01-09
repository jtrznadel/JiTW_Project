const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '01a9eb8ac2mshfc1fe96051fa6d6p128667jsn676cc56de895',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

fetch('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));