const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const copyQuoteBtn = document.getElementById('copy-quote');


function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	if(!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

// Get quote from API
async function getQuote() {
	showLoadingSpinner();
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try{
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		//Author unknown
		if(data.quoteAuthor === ''){
			authorText.innerText = 'Unknown';
		}
		else{
			authorText.innerText = data.quoteAuthor;
		}
		//Long quotes
		if(data.quoteText.length > 120){
			quoteText.classList.add('long-quote');
		}
		else{
			quoteText.classList.remove('long-quote');
		}
		quoteText.innerText = data.quoteText;
		//Stop Loader, Show quote
		removeLoadingSpinner();
	} catch(error){
		getQuote();
		console.log('Whoops! ', error);
	}
}


//Copy to clipboard function
async function copyQuote() {
	navigator.clipboard.writeText(quoteText.innerText)
		.then(()=> window.alert("Copied: " + quoteText.innerText))
		.catch(err => {
			console.log("WHoops! something went wrong");
		});
}

//Tweet Quote function
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}

//On Load
getQuote();


//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
copyQuoteBtn.addEventListener('click', copyQuote);


