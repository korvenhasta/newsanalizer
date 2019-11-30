class NewsApi {
  constructor(apiKey, pageSize = 100) {
    this.apiKey = apiKey;
    this.pageSize = pageSize;
    this.sortBy = 'popularity';

    this._period = 7;
  }

  /* Метод. Вернем json объект или ошибку */
  parseResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  /* Метод. Получим коммит с сервера */
  getNews(topic, callback, errorCallback) {
    const today = new Date();
    const weekAgo = new Date(today.setDate(today.getDate() - this._period));
    const from = weekAgo.toISOString().slice(0, 10);
    const to = new Date().toISOString().slice(0, 10);
    fetch(
      `https://newsapi.org/v2/everything?q=${topic}&from=${from}&to=${to}&language=ru&sortBy=${this.sortBy}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`
    )
      .then(this.parseResult)
      .then(callback)
      .catch(errorCallback);
  }

}

export default NewsApi;
