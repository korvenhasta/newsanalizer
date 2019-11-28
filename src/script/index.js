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

const searchForm = document.querySelector('.search__form');
const searchInput = document.querySelector('.search__input');
const preloader = document.querySelector('.preloader_hidden');
const results = document.querySelector('.result');
const resultTitle = document.querySelector('.result__title');
const resultPaperPage = document.querySelector('.result__paper-page');
const resultsList = document.querySelector('.results-list');
const resultButton = document.querySelector('.result__button');

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

  window.localStorage.clear();
  window.localStorage.setItem('topic', topic);
  window.localStorage.setItem('timeStamp', Date.now());

  cardsArr = [];
  cardPosition = 0;
  let range = document.createRange();
  range.selectNodeContents(resultsList);
  range.deleteContents();

  preloader.classList.remove('preloader_hidden');
  search.showPreloader();
  results.classList.remove('result_visible');
  showResultsTitle();
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

let newsApi = {};
let search = {};

window.onload = () => {
  newsApi = new NewsApi('2c4b1b51dd004658ae3055a2eb42a668');
  search = new Search();

  searchForm.addEventListener('submit', findNews);
  resultButton.addEventListener('click', showMoreCardsClickHandler);
}
