export default class Search {
  constructor() {
    this.preloader = document.querySelector('.preloader__container');
    this.searchingMessage = document.querySelector('.preloader__message');
    this.showPreloader = this.showPreloader.bind(this);
    this.hidePreloader = this.hidePreloader.bind(this);

    this.notFoundPicture = document.querySelector('.preloader__not-found');
    this.notFoundTitle = document.querySelector('.preloader__title');
    this.notFoundMessage = document.querySelector('.preloader__message_not-found');
    this.showNotFoundMessage = this.showNotFoundMessage.bind(this);
    this.hideNotFoundMessage = this.hideNotFoundMessage.bind(this);

  }

  showPreloader() {
    this.preloader.classList.remove('preloader__container_visible');
    this.searchingMessage.classList.remove('preloader__message_visible');
  }

  hidePreloader() {
    this.preloader.classList.add('preloader__container_visible');
    this.searchingMessage.classList.add('preloader__message_visible');
  }

  showNotFoundMessage() {
    this.notFoundPicture.classList.remove('preloader__not-found_visible');
    this.notFoundTitle.classList.remove('preloader__title_visible');
    this.notFoundMessage.classList.remove('preloader__message_visible');
  }

  hideNotFoundMessage() {
    this.notFoundPicture.classList.add('preloader__not-found_visible');
    this.notFoundTitle.classList.add('preloader__title_visible');
    this.notFoundMessage.classList.add('preloader__message_visible');
  }
}
