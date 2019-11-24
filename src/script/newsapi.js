class NewsApi {
  constructor () {

  }

  /* Метод. Вернем json объект или ошибку */
  parseResult(res) {
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  /* Метод. Выведем ошибку в консоль */
  handleError(err) {
    console.log(err);
  }

  /* Метод. Получим коммит с сервера */
  getNews(callback) {
    fetch(
        `https://newsapi.org/v2/everything?q=nature&from=2019-11-17&to=2019-11-23&sortBy=publishedAt&apiKey=2c4b1b51dd004658ae3055a2eb42a668`
    )
    .then(this.parseResult)
    .then(callback)
    .catch(this.handleError);
  }
}

export default NewsApi;
