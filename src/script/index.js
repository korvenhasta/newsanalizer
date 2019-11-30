import "../pages/style.css";
import NewsApi from './newsapi.js'
import Card from './card.js'
import Form from './form.js'
import Preloader from './preloader.js'

window.onload = () => {
  const newsApi = new NewsApi('2c4b1b51dd004658ae3055a2eb42a668');
  const form = new Form(document.querySelector('.search__form'), findNews);
  const preloader = new Preloader(document.querySelector('.preloader'));

  let cardsArr = [];
  let cardPosition = 0;

  const results = document.querySelector('.result');
  const resultTitle = document.querySelector('.result__title');
  const resultPaperPage = document.querySelector('.result__paper-page');
  const resultsList = document.querySelector('.results-list');
  const resultButton = document.querySelector('.result__button');

  resultButton.addEventListener('click', showMoreCardsClickHandler);
  resultsList.addEventListener('click', (event) => {
    const element = event.target;
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

  /* Метод. Отрисуем карточки по 3 штуки */
  function showMoreCards() {
    if (cardsArr.length === 0) {
      preloader.nothingFound('К сожалению по вашему запросу ничего не найдено.');
      notFound();
    }
    else {
      let lastPosition = Math.min(cardPosition + 3, cardsArr.length);
      for (let i = cardPosition; i < lastPosition; i++) {
        const pieceNews = cardsArr[i];
        const publishedDate = new Date(pieceNews.publishedAt);
        const card = new Card(pieceNews.urlToImage, publishedDate, pieceNews.title, pieceNews.description, pieceNews.source.name, pieceNews.url);
        resultsList.appendChild(card.element);
      }
      cardPosition = lastPosition;
      return lastPosition === cardsArr.length;
    }
  }

  /* Метод. Скроем кнопку, если карточки закончились */
  function showMoreCardsClickHandler() {
    if (showMoreCards() === true) {
      resultButton.classList.add('result__button_hidden');
    }
  }

  /* Метод. Обнулим массив карточек, позицию и грид с карточками*/
  function resetResults() {
    cardsArr = [];
    cardPosition = 0;
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

    newsApi.getNews(topic, news => {
      cardsArr = news.articles;
      window.localStorage.setItem('news', JSON.stringify(cardsArr));
      window.localStorage.setItem('totalResults', news.totalResults);
      form.unBlock();
      preloader.somethingFound();
      showResults();
      showMoreCardsClickHandler();
    }, (error) => {
      resetResults();
      preloader.nothingFound('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      notFound();
      form.unBlock();
    });
  }
}
