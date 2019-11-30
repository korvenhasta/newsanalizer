class GithubApi {
  constructor (owner, repository) {
    this.owner = owner;
    this.repository = repository;
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
        `https://api.github.com/repos/${this.owner}/${this.repository}/commits`
    )
    .then(this.parseResult)
    .then(callback)
    .catch(errorCallback);
  }
}

export default GithubApi;
