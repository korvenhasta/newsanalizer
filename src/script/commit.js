class Commit {
  constructor(name, email, date, message, avatarUrl) {
    let commit = this;
    this.name = name;
    this.sliderList = document.querySelector('.glide__slides');
  }

  /* Метод. Создаем DOM-элемент коммита */
  create() {
    function createElement(elType, classes) {
      const elContainer = document.createElement(elType);
      elContainer.classList.add(classes);

      return elContainer;
    }

    const commitContainer = createElement('div', 'slider__card');

    const date = createElement('time', 'slider__date');

    const userContainer = createElement('div', 'slider__user');
    const avatar = createElement('img', 'slider__user-avatar');
    avatar.setAttribute('alt', 'Аватар пользователя');

    const infoContainer = createElement('div', 'slider__user-info');
    const userName = createElement('h3', 'section-title section-title_size_medium slider__user-name');
    const email = createElement('p', 'content-text content-text_size_small slider__user-email');

    const userComment = createElement('p', 'content-text content-text_size_medium slider__user-comment');

    commitContainer.appendChild(date);
    commitContainer.appendChild(userContainer);
    commitContainer.appendChild(userComment);

    userContainer.appendChild(avatar);
    userContainer.appendChild(infoContainer);

    infoContainer.appendChild(userName);
    infoContainer.appendChild(email);

    return {commitContainer};
  }

  /* Метод. Отрисуем коммит в слайдере */
  render() {

  }
}
