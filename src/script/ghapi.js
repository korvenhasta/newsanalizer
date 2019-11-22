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

  /* Метод. Выведем ошибку в консоль */
  handleError(err) {
    console.log(err);
  }

  /* Метод. Получим коммит с сервера */
  getCommit(callback) {
    fetch(
        `https://api.github.com/repos/korvenhasta/newsanalizer/commits`
    )
    .then(this.parseResult)
    .then(callback)
    .catch(this.handleError);
  }
}

export default GithubApi;
