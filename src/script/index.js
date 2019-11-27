import "../pages/style.css";
import NewsApi from './newsapi.js'
import Card from './card.js'
import Search from './search.js'

/* Метод. Посчитаем ключевое слово в заголовках и описании новости */
function countHeadings(topic, str2) {
  if (str2 === null) {
    return 0;
  }
  topic = topic.toLowerCase();
  str2 = str2.toLowerCase();
  let counter = 0;
  let currPos = 0;
  let newPos = 0;
  while ((newPos = str2.indexOf(topic, currPos)) !== -1) {
    counter += 1;
    currPos = newPos + topic.length;
  }
  return counter;
}


/* Метод. Разберем новость, полученную от API */
// newsApi.getNews(topic, news => {
//   console.log(news);
//   summaryTextTotal.textContent = news.totalResults;

//   let articlesByDay = news.articles.reduce((prevVal, element) => {
//     let resHeadings = countHeadings(topic, element.title);
//     let resDescription = countHeadings(topic, element.description);
//     let dayOfWeek = new Date(element.publishedAt).getDay();

//     if (prevVal[dayOfWeek] !== undefined) {
//       prevVal[dayOfWeek] = {
//         numHeadings: resHeadings + prevVal[dayOfWeek].numHeadings,
//         numDescription: resDescription + prevVal[dayOfWeek].numDescription
//       };
//     }
//     else {
//       prevVal[dayOfWeek] = {numHeadings: resHeadings, numDescription: resDescription};
//     }
//     return prevVal;
//   }, Array(7).fill());

//   let headings = articlesByDay.reduce((sum, element) => {
//     if(element === undefined)
//       return sum;
//     return element.numHeadings + sum;
//   }, 0);
//   summaryTextHeadings.textContent = headings;

//   const analiticsBarContainer = document.querySelector('.analitics__container');
//   const analiticsBar = analiticsBarContainer.querySelectorAll('.analitics__bar');

//   const today = Date.now();

//   for (let i=0; i<7; i++) {
//     const currentDay = new Date((today - (i - 6) * 24 * 60 * 60 * 1000)).getDay();
//     let dayArticles = articlesByDay[currentDay];

//     if (dayArticles === undefined) {
//       analiticsBar[i].textContent = '0';
//     }
//     else {
//       let sum = dayArticles.numHeadings + dayArticles.numDescription;
//       analiticsBar[i].textContent = sum;
//       if (sum > 1) {
//         analiticsBar[i].style.width = `${sum}%`;
//       }
//     }
//   }
// });

const searchButton = document.querySelector('.search__button');

const searchForm = document.querySelector('.search__form');
const searchInput = document.querySelector('.search__input');
searchForm.addEventListener('submit', findNews);

const preloader = document.querySelector('.preloader_hidden');

const results = document.querySelector('.result');
const resultTitle = document.querySelector('.result__title');
const resultPaperPage = document.querySelector('.result__paper-page');
const resultsList = document.querySelector('.results-list');
const resultButton = document.querySelector('.result__button');
resultButton.addEventListener('click', showMoreCardsClickHandler);


function showResults() {
  results.classList.remove('result_visible');
}

function hideResults() {
  results.classList.add('result_visible');
}

function showResultsTitle() {
  resultTitle.classList.remove('result__title_visible');
}

function hideResultsTitle() {
  resultTitle.classList.add('result__title_visible');
}

let cardsArr = [];
let cardPosition = 0;

function showMoreCards() {
  let lastPosition = Math.min(cardPosition + 3, cardsArr.length);
  for (let i=cardPosition; i<lastPosition; i++) {
    let pieceNews = cardsArr[i];
    let card = new Card(pieceNews.urlToImage, pieceNews.publishedAt, pieceNews.title, pieceNews.description, pieceNews.source.name);
    resultsList.appendChild(card.element);
  }
  cardPosition = lastPosition;
  return lastPosition === cardsArr.length;
}

function showMoreCardsClickHandler() {
  if (showMoreCards() === true) {
    resultButton.classList.add('result__button_hidden');
  }
}

function findNews(event) {
  event.preventDefault();
  let topic = searchInput.value;

  window.localStorage.setItem('topic', topic);

  cardsArr = [];
  cardPosition = 0;
  var range = document.createRange();
  range.selectNodeContents(resultsList);
  range.deleteContents();

  preloader.classList.remove('preloader_hidden');
  search.showPreloader();
  results.classList.remove('result_visible');
  showResultsTitle();
  // console.log(searchInput.value);
  preloader.classList.add('preloader_hidden');
  resultPaperPage.classList.remove('result__paper-page_hidden');
  resultsList.classList.remove('results-list_hidden');

  newsApi.getNews(topic, news =>
    {
    console.log(news);
    cardsArr = news.articles;
    window.localStorage.setItem('news', JSON.stringify(cardsArr));
    window.localStorage.setItem('totalResults', news.totalResults);
    showMoreCardsClickHandler();
  });
  resultButton.classList.remove('result__button_hidden');
}

function starter() {
  return {
    newsApi: new NewsApi('2c4b1b51dd004658ae3055a2eb42a668'),
    search: new Search()
  }
}


let {newsApi, search} = starter();
