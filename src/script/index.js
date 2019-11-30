import "../pages/style.css";
import NewsApi from './newsapi.js'
import Card from './card.js'
import Form from './form.js'

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
const searchButton = document.querySelector('.search__button');

const preloader = document.querySelector('.preloader');
const preloaderSearchingContainer = document.querySelector('.preloader__searching');
const notFoundContainer = document.querySelector('.preloader__not-found');
const preloaderMessage = document.querySelector('.preloader__message');
const results = document.querySelector('.result');
const resultTitle = document.querySelector('.result__title');
const resultPaperPage = document.querySelector('.result__paper-page');
const resultsList = document.querySelector('.results-list');
const resultButton = document.querySelector('.result__button');

//TODO: const resultMessage = document.querySelector('.preloader__message_searching');


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

function hideResults() {
  results.classList.add('result_hidden');
}

/* Метод. Покажем блок поиска резульатов */
function searching() {
  results.classList.remove('result_hidden');
  resultTitle.classList.remove('result__title_hidden');
  resultPaperPage.classList.add('result__paper-page_hidden');
  preloader.classList.remove('preloader_hidden');
  preloaderSearchingContainer.classList.remove('preloader__searching_hidden');
  notFoundContainer.classList.add('preloader__not-found_hidden');
  resultsList.classList.add('results-list_hidden');
  resultButton.classList.add('result__button_hidden');
}

/* Метод. Покажем блок, когда результаты не найдены */
function notFound(reason) {
  results.classList.remove('result_hidden');
  resultTitle.classList.remove('result__title_hidden');
  resultPaperPage.classList.add('result__paper-page_hidden');
  preloader.classList.remove('preloader_hidden');
  preloaderSearchingContainer.classList.add('preloader__searching_hidden');
  notFoundContainer.classList.remove('preloader__not-found_hidden');
  resultsList.classList.add('results-list_hidden');
  resultButton.classList.add('result__button_hidden');
  preloaderMessage.textContent = reason;
}

/* Метод. Покажем блок с результатами поиска */
function showResults() {
  results.classList.remove('result_hidden');
  resultTitle.classList.remove('result__title_hidden');
  resultPaperPage.classList.remove('result__paper-page_hidden');
  preloader.classList.add('preloader_hidden');
  preloaderSearchingContainer.classList.add('preloader__searching_hidden');
  notFoundContainer.classList.add('preloader__not-found_hidden');
  resultsList.classList.remove('results-list_hidden');
  resultButton.classList.remove('result__button_hidden');
}

let cardsArr = [];
let cardPosition = 0;

function showMoreCards() {
  if (cardsArr.length === 0) {
    notFound('К сожалению по вашему запросу ничего не найдено.');
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

function findNews(topic) {

  window.localStorage.clear();
  window.localStorage.setItem('topic', topic);
  window.localStorage.setItem('timeStamp', Date.now());

  resetResults();

  searching();

  newsApi.getNews(topic, news =>
    {
    showResults();
    console.log(news);
    cardsArr = news.articles;
    window.localStorage.setItem('news', JSON.stringify(cardsArr));
    window.localStorage.setItem('totalResults', news.totalResults);
    showMoreCardsClickHandler();
    form.unBlock();
  }, (error) => {
    resetResults();
    hideResults();
    notFound('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    form.unBlock();
  });
}

let newsApi = {};
let form = {};

window.onload = () => {
  newsApi = new NewsApi('2c4b1b51dd004658ae3055a2eb42a668');
  form = new Form(searchForm, findNews);

  searchForm.addEventListener('submit', findNews);
  resultButton.addEventListener('click', showMoreCardsClickHandler);

}
