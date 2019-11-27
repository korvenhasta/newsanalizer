class NewsApi {
  constructor (apiKey, pageSize = 100) {
    this.apiKey = apiKey;
    this.pageSize = pageSize;
    this.sortBy = 'popularity';
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
  getNews(topic, callback) {
    const today = new Date();
    const weekAgo = new Date(today.setDate(today.getDate() - 7));
    const from = weekAgo.toISOString().slice(0,10);
    const to = new Date().toISOString().slice(0,10);
    fetch(
        `https://newsapi.org/v2/everything?q=${topic}&from=${from}&to=${to}&language=ru&sortBy=${this.sortBy}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`
    )
    .then(this.parseResult)
    .then(callback)
    .catch(this.handleError);
  }

}

export default NewsApi;
