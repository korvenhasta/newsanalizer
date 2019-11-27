import "../pages/style.css";
import NewsApi from './newsapi.js'
import Card from './card.js'
import Search from './search.js'

//const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'

const topic = 'наука';
const searchButton = document.querySelector('.search__button');

const searchForm = document.querySelector('.search__form');
const searchInput = document.querySelector('.search__input');
document.forms.search.addEventListener('submit', findNews);

const preloader = document.querySelector('.preloader_hidden');

const results = document.querySelector('.result');
const resultTitle = document.querySelector('.result__title');
const resultPaperPage = document.querySelector('.result__paper-page');
const resultsList = document.querySelector('.results-list');
const resultButton = document.querySelector('.result__button');
resultButton.addEventListener('click', showMoreCards);


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

function showMoreCards(arr) {
  console.log(arr);
}

function findNews(event) {
  event.preventDefault();
  preloader.classList.remove('preloader_hidden');
  search.showPreloader();
  results.classList.remove('result_visible');
  showResultsTitle();
  // console.log(searchInput.value);
  preloader.classList.add('preloader_hidden');
  resultPaperPage.classList.remove('result__paper-page_hidden');
  resultsList.classList.remove('results-list_hidden');

  let cardsArr = [];
  newsApi.getNews(searchInput.value, news =>
    {
    console.log(news);
    for (let i=0; i<news.articles.length; i++) {
      let pieceNews = news.articles[i];
      let card = new Card(pieceNews.urlToImage, pieceNews.publishedAt, pieceNews.title, pieceNews.description, pieceNews.source.name);
      cardsArr.push(card);
      resultsList.appendChild(card.element);
    }
  });
  resultButton.classList.remove('result__button_hidden');

  showMoreCards(cardsArr);
}

function starter() {
  return {
    newsApi: new NewsApi('2c4b1b51dd004658ae3055a2eb42a668'),
    search: new Search()
  }
}


let {newsApi, search} = starter();
