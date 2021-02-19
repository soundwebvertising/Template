const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

// Get Quote from API http://api.forismatic.com/api/1.0/ or use https://type.fit/api/quotes
async function getQuote() {
  //const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  //const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en?format=json';
  const apiUrl = 'https://type.fit/api/quotes/?method=getQuote&lang=en?format=json';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    let number = Math.floor(Math.random() * data.length);
    let quote;
    // if author is blank add "unknown"
    if (data[number].author === null) {
      quote = data[number];
      authorText = "Unknown";
    } else {
      quote = data[number];
      authorText.innerText = data[number].author;
      //quoteText.innerText = data[number].text;
    }

    //reduce font size for long quotes
    if (quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.add('long-quote');
    }
    quoteText.innerText = data[number].text;
    console.log(quote);
  } catch (error) {
    getQuote();
    console.log('Whoops, no quote', error);
  }
}

// tweet quote
function tweetQuote() {
  //https://twitter.com/intent/follow
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = 'https://twitter.com/intent/tweet?text=${quote} - ${author}';

  window.open(twitterUrl, '_blank');

  

}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
getQuote();