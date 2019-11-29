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
const resultNotFoundImg = document.querySelector('.preloader__not-found_hidden');
const resultTitleNotFound = document.querySelector('.preloader__title_hidden');
const resultMessage = document.querySelector('.preloader__message_searching');
const resultNotFoundMessage = document.querySelector('.preloader__message_hidden');

resultsList.addEventListener('click', (event) => {
  let element = event.target;
  while (!element.classList.contains('result-card')) {
    if (element != resultsList) {
      element = element.parentElement;
    }
    else {
      return;
    }
  }
  window.open(element.getAttribute('data-url'), '_blank');
});

function showResults() {
  results.classList.remove('result_hidden');
}

function hideResults() {
  results.classList.add('result_hidden');
}

function showResultsTitle() {
  resultTitle.classList.remove('result__title_hidden');
}

function hideResultsTitle() {
  resultTitle.classList.add('result__title_hidden');
}

let cardsArr = [];
let cardPosition = 0;

function showMoreCards() {
  if (cardsArr.length === 0) {
    resultsList.classList.add('results-list_hidden');
    resultButton.classList.add('result__button_hidden');
    resultPaperPage.classList.add('result__paper-page_hidden');
    preloader.classList.remove('preloader_hidden');
    resultMessage.classList.add('preloader__message_searching');
    resultNotFoundImg.classList.remove('preloader__not-found_hidden');
    resultTitleNotFound.classList.remove('preloader__title_hidden');
    resultNotFoundMessage.classList.remove('preloader__message_hidden');
  }
  else {
    let lastPosition = Math.min(cardPosition + 3, cardsArr.length);
    for (let i=cardPosition; i<lastPosition; i++) {
      let pieceNews = cardsArr[i];
      let card = new Card(pieceNews.urlToImage, pieceNews.publishedAt, pieceNews.title, pieceNews.description, pieceNews.source.name, pieceNews.url);
      resultsList.appendChild(card.element);
    }
    cardPosition = lastPosition;
    return lastPosition === cardsArr.length;
  }
}

function showMoreCardsClickHandler() {
  if (showMoreCards() === true) {
    resultButton.classList.add('result__button_hidden');
  }
}

function resetResults() {
  cardsArr = [];
  cardPosition = 0;
  let range = document.createRange();
  range.selectNodeContents(resultsList);
  range.deleteContents();
}

function findNews(event) {
  event.preventDefault();
  let topic = searchInput.value;

  window.localStorage.clear();
  window.localStorage.setItem('topic', topic);
  window.localStorage.setItem('timeStamp', Date.now());

  resetResults();

  preloader.classList.remove('preloader_hidden');
  search.showPreloader();
  results.classList.remove('result_hidden');
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
  }, (error) => {
    resetResults();
    hideResults();
    setTimeout( () => alert('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз') , 50);
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
