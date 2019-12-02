import "../pages/style.css";

import NewsApi from './newsapi.js'
import Card from './card.js'
import Form from './form.js'
import Preloader from './preloader.js'

import { siteConfig } from './siteConfig.js'

window.onload = () => {
  const newsApi = new NewsApi(siteConfig.newsApi.apiKey, siteConfig.news.maxItems);
  const form = new Form(document.querySelector('.search__form'), findNews);
  const preloader = new Preloader(document.querySelector('.preloader'));

  let newsItems = [];
  let newsItemsPosition = 0;

  const results = document.querySelector('.result');
  const resultTitle = document.querySelector('.result__title');
  const resultPaperPage = document.querySelector('.result__paper-page');
  const resultsList = document.querySelector('.results-list');
  const resultButton = document.querySelector('.result__button');

  /* Метод. Покажем блок поиска резульатов */
  function searching() {
    results.classList.remove('result_hidden');
    resultTitle.classList.remove('result__title_hidden');
    resultPaperPage.classList.add('result__paper-page_hidden');
    resultsList.classList.add('results-list_hidden');
    resultButton.classList.add('result__button_hidden');
  }

  /* Метод. Покажем блок, когда результаты не найдены */
  function notFound() {
    results.classList.remove('result_hidden');
    resultTitle.classList.remove('result__title_hidden');
    resultPaperPage.classList.add('result__paper-page_hidden');
    resultsList.classList.add('results-list_hidden');
    resultButton.classList.add('result__button_hidden');
  }

  /* Метод. Покажем блок с результатами поиска */
  function showResults() {
    results.classList.remove('result_hidden');
    resultTitle.classList.remove('result__title_hidden');
    resultPaperPage.classList.remove('result__paper-page_hidden');
    resultsList.classList.remove('results-list_hidden');
    resultButton.classList.remove('result__button_hidden');
  }

  /* Метод. Отрисуем карточки поштучно */
  function showMoreCards() {
    if (newsItems.length === 0) {
      preloader.nothingFound('К сожалению по вашему запросу ничего не найдено.');
      notFound();
      return;
    }

    const lastPosition = Math.min(newsItemsPosition + siteConfig.news.itemsPerStep, newsItems.length);
    newsItems.slice(newsItemsPosition, lastPosition).forEach(pieceNews => {
      const publishedDate = new Date(pieceNews.publishedAt);
      const card = new Card(pieceNews.urlToImage, publishedDate, pieceNews.title, pieceNews.description, pieceNews.source.name, pieceNews.url);
      resultsList.appendChild(card.element);
    });

    newsItemsPosition = lastPosition;
    if (lastPosition === newsItems.length) {
      resultButton.classList.add('result__button_hidden');
    }
  }

  /* Метод. Обнулим массив карточек, позицию и грид с карточками*/
  function resetResults() {
    newsItems = [];
    newsItemsPosition = 0;
    const range = document.createRange();
    range.selectNodeContents(resultsList);
    range.deleteContents();
  }

  /* Метод. Найдем новости и сохраним их в localStorage*/
  function findNews(topic) {
    window.localStorage.clear();
    window.localStorage.setItem('topic', topic);
    window.localStorage.setItem('timeStamp', Date.now());

    resetResults();
    preloader.searching();
    searching();

    newsApi.getNews(
      topic,
      news => {
        newsItems = news.articles;
        window.localStorage.setItem('news', JSON.stringify(newsItems));
        window.localStorage.setItem('totalResults', news.totalResults);
        form.unBlock();
        preloader.somethingFound();
        showResults();
        showMoreCards();
      },
      error => {
        console.log(error);
        resetResults();
        preloader.nothingFound('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        notFound();
        form.unBlock();
      });
  }

  resultButton.addEventListener('click', () => showMoreCards());

  resultsList.addEventListener('click', (event) => {
    const cardElement = event.target.closest('.result-card');
    if (cardElement != null) {
      window.open(cardElement.getAttribute('data-url'), '_blank');
    }
  });
}
