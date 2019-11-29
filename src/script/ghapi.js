class GithubApi {
  constructor () {

  }

  /* Метод. Вернем json объект или ошибку */
  parseResult(res) {
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  /* Метод. Получим коммит с сервера */
  getCommit(callback, errorCallback) {
    fetch(
        `https://api.github.com/repos/korvenhasta/newsanalizer/commits`
    )
    .then(this.parseResult)
    .then(callback)
    .catch(this.errorCallback);
  }
}

export default GithubApi;
