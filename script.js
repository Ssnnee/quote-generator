// const quoteContainer = document.getElementById('quote-Container');
// const quoteText = document.getElementById('quote');
// const authorText = document.getElementById('author');
// const twitterBtn = document.getElementById('twitter');
// const newQuoteBtn = document.getElementById('new-quote');
// const loader = document.getElementById('loader');

// // Show loading
// function loading(){
//     loader.hidden = true;
//     quoteContainer.hidden = true;
// }

// // Hide loading
// function complete(){
//     if (!loader.hidden){
//         quoteContainer.hidden = false;
//         loader.hidden = true;
//     }
// }
// // Get quote from API 
// async function getQuote(){
//     loading();
//     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//     const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json ';
//     try {
//         const response = await fetch(proxyUrl + apiUrl);
//         const data = await response.json();
//         if(data.quoteAuthor === ''){
//             authorText.innerText = 'Unknwon';
//         } else{
//             authorText.innerText = data.quoteAuthor;
//         }
//         if(data.quoteText.length > 120){
//             quoteText.classList.add('long-quote');
//         } else {
//             quoteText.classList.remove('long-quote')
//         }
//         quoteText.innerText = data.quoteText;
//         //Stop loader, show quote
//         complete(   );
//     } catch (error) {
        
//         console.log('Ops, no quote', error);
//     }
// }

// function tweetQuote(){
//     const quote = quoteText.innerText;
//     const author = authorText.innerText;
//     const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
//     window.open(twitterUrl, '_blank');

// }

// //Event listeners

// newQuoteBtn.addEventListener('click', getQuote);
// twitterBtn.addEventListener('click', tweetQuote);

// //On load
// getQuote();

// // async function getQuote() {
// //     loading();
// //     const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
// //     const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
// //     try {
// //         const response = await fetch(proxyUrl + apiUrl);
// //         const data = await response.json();
// //         // If Author is blank, add 'Unknown'
// //         if (data.quoteAuthor === '') {
// //             authorText.innerText = 'Unknown';
// //         } else {
// //             authorText.innerText = data.quoteAuthor;
// //         }
// //         // Reduce font size for long quotes
// //         if (data.quoteText.length > 120) {
// //             quoteText.classList.add('long-quote');
// //         } else {
// //             quoteText.classList.remove('long-quote');
// //         }
// //         quoteText.innerText = data.quoteText;
// //         // Stop Loader, Show Quote
// //         complete();
// //     } catch (error) {
// //         getQuote();
// //     }
// // }
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
