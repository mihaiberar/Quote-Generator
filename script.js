const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const myLoader = document.querySelector('#loader');

// Show Loading
function loading() {
    myLoader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    if (myLoader.hidden===false) {
        quoteContainer.hidden=false;
        myLoader.hidden=true;
    }
}

// Get Quote From API
async function getQuote(){

    loading();

    const proxyAPIURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyAPIURL + apiURL);
        const data = await response.json();
        // If Author is blank, add "Unknown"
        if (data.quoteAuthor==='') {
            quoteAuthor.innerHTML = 'Unknown';
        } else {
            quoteAuthor.innerHTML = data.quoteAuthor;
        }
        // Reduce font-size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }  
        quoteText.innerHTML = data.quoteText;

        // Stop Loader, Show Quote
        complete();

    } catch (error) {
    // Catch Error Here
    getQuote(); 
    }
}

//Tweet Quote 
function tweetQuote() {
    const quote=quoteText.innerHTML;
    const author=quoteAuthor.innerHTML;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    //or: const twitterUrl = 'https://twitter.com/intent/tweet?text=' + quote + '-' + author;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);
    
// On Load
getQuote();
