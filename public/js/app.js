const socket = io();

const usdArr = [];
const gbpArr = [];
const eurArr = [];
const jpyArr = [];

socket.on('subscribed-btc-prices', tickerdata => {
	refreshTicker(tickerdata);
});

function refreshTicker(tickerdata) {
	const tblBTC = document.getElementById("btcticker");
	const tblRow = tblBTC.getElementsByTagName("tr");
	let rowCnt = 0;

	tickerdata.map((item) => {
		for (let i = 0; i < tblRow.length; i++) {
			const tblCol = tblRow[i].getElementsByTagName("td")[0];
      if (tblCol) {
				const txtValue = tblCol.getAttribute('data-currency');
        if (txtValue === '' || txtValue === item.target) {
          tblBTC.deleteRow(i);
        }
      }   
		}

		const tblBTCbody = document.getElementById('btcticker').getElementsByTagName('tbody')[0];
		const newRow = tblBTCbody.insertRow(rowCnt);
		const cell1 = newRow.insertCell(0);
		const cell2 = newRow.insertCell(1);
		const cell3 = newRow.insertCell(2);
		const cell4 = newRow.insertCell(3);
		const cell5 = newRow.insertCell(4);
		cell1.innerHTML = printCurrency(item.target);
		cell1.setAttribute('data-currency', item.target);
		cell2.innerHTML = item.price;
		cell3.innerHTML = item.volume;
		cell4.innerHTML = item.change;
		cell5.innerHTML = '<span id="sparkline-' + item.target +'"></span>';
		drawSparkline(item.target, item.price);
		rowCnt++;
	});

	tapeTicker(tickerdata);
}

function printCurrency(currency) {
	switch(currency) {
		case 'USD':
			return '<span class="currency">$</span>';
		case 'GBP':
			return '<span class="currency">&pound;</span>';
		case 'EUR':
			return '<span class="currency">&euro;</span>';
		case 'JPY':
			return '<span class="currency">&yen;</span>';
	}
}

function drawSparkline(currency, price) {
	switch(currency) {
		case 'USD':
			sparkline = new Sparkline(document.getElementById("sparkline-USD"));
			usdArr.push(price);
			if(usdArr.length > 100){ usdArr.shift();}
			sparkline.draw(usdArr);
			break;
		case 'GBP':
			sparkline = new Sparkline(document.getElementById("sparkline-GBP"));
			gbpArr.push(price);
			if(gbpArr.length > 100){ gbpArr.shift();}
			sparkline.draw(gbpArr);
			break;
		case 'EUR':
			sparkline = new Sparkline(document.getElementById("sparkline-EUR"));
			eurArr.push(price);
			if(eurArr.length > 100){ eurArr.shift();}
			sparkline.draw(eurArr);
			break;
		case 'JPY':
			sparkline = new Sparkline(document.getElementById("sparkline-JPY"));
			jpyArr.push(price);
			if(jpyArr.length > 100){ jpyArr.shift();}
			sparkline.draw(jpyArr);
			break;
	}
}

function tapeTicker(tickerdata) {
	if (usdArr.length > 1) {
		const ticker = document.getElementById('tickertape');
		ticker.innerHTML = `Bitcoin (BTC): <b>${roundNumber(tickerdata[0].price)}</b> USD ${getDirection(tickerdata[0].target)} <i class="seperator"></i> <b>${roundNumber(tickerdata[1].price)}</b> GBP ${getDirection(tickerdata[1].target)} <i class="seperator"></i> <b>${roundNumber(tickerdata[2].price)}</b> EUR ${getDirection(tickerdata[2].target)} <i class="seperator"></i> <b>${roundNumber(tickerdata[3].price)}</b> JPY ${getDirection(tickerdata[3].target)}<br>
		<span>Updated on: ${formatDate()}</span>`;
	}
}

function roundNumber(num) {
	return parseFloat(num).toFixed(2);
}

function getDirection(currency) {
	switch(currency) {
		case 'USD':
			return (usdArr[usdArr.length - 2] === usdArr[usdArr.length - 1]) ? '<i class="nochange"></i>' : (usdArr[usdArr.length - 2] > usdArr[usdArr.length - 1]) ? '<i class="down"></i>' : '<i class="up"></i>';
		case 'GBP':
			return (gbpArr[gbpArr.length - 2] === gbpArr[gbpArr.length - 1]) ? '<i class="nochange"></i>' : (gbpArr[gbpArr.length - 2] > gbpArr[gbpArr.length - 1]) ? '<i class="down"></i>' : '<i class="up"></i>';
		case 'EUR':
			return (eurArr[eurArr.length - 2] === eurArr[eurArr.length - 1]) ? '<i class="nochange"></i>' : (eurArr[eurArr.length - 2] > eurArr[eurArr.length - 1]) ? '<i class="down"></i>' : '<i class="up"></i>';
		case 'JPY':
			return (jpyArr[jpyArr.length - 2] === jpyArr[jpyArr.length - 1]) ? '<i class="nochange"></i>' : (jpyArr[jpyArr.length - 2] > jpyArr[jpyArr.length - 1]) ? '<i class="down"></i>' : '<i class="up"></i>';
	}
}

function formatDate() {
	const date = new Date();
	const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
	const [{ value: mn },,{ value: day },,{ value: yr},,{ value: hr},,{ value: min},,{ value: sec}] = dateTimeFormat.formatToParts(date);
	return `${day}-${mn}-${yr} ${hr}:${min}:${sec}`;
}


