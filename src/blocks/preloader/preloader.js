export default class Preloader {
  constructor(elementContainer) {
    this._preloader = elementContainer;
    this._preloaderSearchingContainer = elementContainer.querySelector('.preloader__searching');
    this._notFoundContainer = elementContainer.querySelector('.preloader__not-found');
    this._preloaderMessage = elementContainer.querySelector('.preloader__message');
  }

  /* Метод. Покажем блок поиска резульатов */
  searching() {
    this._preloader.classList.remove('preloader_hidden');
    this._preloaderSearchingContainer.classList.remove('preloader__searching_hidden');
    this._notFoundContainer.classList.add('preloader__not-found_hidden');
  }

  /* Метод. Покажем блок, когда результаты не найдены */
  nothingFound(reason) {
    this._preloader.classList.remove('preloader_hidden');
    this._preloaderSearchingContainer.classList.add('preloader__searching_hidden');
    this._notFoundContainer.classList.remove('preloader__not-found_hidden');
    this._preloaderMessage.textContent = reason;
  }

  /* Метод. Покажем блок с результатами поиска */
  somethingFound() {
    this._preloader.classList.add('preloader_hidden');
    this._preloaderSearchingContainer.classList.add('preloader__searching_hidden');
    this._notFoundContainer.classList.add('preloader__not-found_hidden');
  }
}
