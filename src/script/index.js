import "../pages/style.css";
import NewsApi from './newsapi.js'
import Card from './card.js'

//const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'

const resultsList = document.querySelector('.results-list');
const submitButton = document.querySelector('.search__button');
const topic = 'наука';
const searchButton = document.querySelector('.search__button');

const searchForm = document.querySelector('.search__form');
// document.forms.topic.addEventListener('input', );


function starter() {
  return {
    newsApi: new NewsApi('2c4b1b51dd004658ae3055a2eb42a668')
  }
}

function getNewsFromServer() {
  newsApi.getNews(topic, news =>
    {
      console.log(news);
      for (let i=2; i<=4; i++) {
        let pieceNews = news.articles[i];
        let card = new Card(pieceNews.urlToImage, pieceNews.publishedAt, pieceNews.title, pieceNews.description, pieceNews.source.name);
        resultsList.appendChild(card.element);
      }
    });
}


let {newsApi} = starter();
getNewsFromServer();
