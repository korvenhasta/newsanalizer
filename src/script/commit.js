class Commit {
  constructor(name, email, date, message, avatarUrl) {
    let commit = this;
    this.name = name;
    this.email = email;
    this.date = date;
    this.message = message;
    this.avatarUrl = avatarUrl;
    this.commitsArray = [];
    this.sliderList = document.querySelector('.glide__slides');
    let element = this.createCommit();
    this.commitElement = element.commitContainer;
    this.bulletsArray = [];
    this.bulletList = document.querySelector('.glide__bullets');
    let elBullet = this.createBullet();
    this.bulletElement = elBullet.bulletsContainer;
  }

  /* Метод. Создаем DOM-элемент коммита */
  createCommit() {
    function createElement(elType, classes) {
      const elContainer = document.createElement(elType);
      if (Array.isArray(classes) === true) {
        classes.forEach(element => {
          elContainer.classList.add(element);
        });
      }
      else {
        elContainer.classList.add(classes);
      }
      return elContainer;
    }

    const commitContainer = createElement('div', 'slider__card');

    const date = createElement('time', 'slider__date');

    const userContainer = createElement('div', 'slider__user');
    const avatar = createElement('img', 'slider__user-avatar');
    avatar.setAttribute('alt', 'Аватар пользователя');

    const infoContainer = createElement('div', 'slider__user-info');
    const userName = createElement('h3', ['section-title', 'section-title_size_medium', 'slider__user-name']);
    const email = createElement('p', ['content-text', 'content-text_size_small', 'slider__user-email']);

    const userComment = createElement('p', ['content-text', 'content-text_size_medium', 'slider__user-comment']);

    commitContainer.appendChild(date);
    commitContainer.appendChild(userContainer);
    commitContainer.appendChild(userComment);

    userContainer.appendChild(avatar);
    userContainer.appendChild(infoContainer);

    infoContainer.appendChild(userName);
    infoContainer.appendChild(email);

    return {commitContainer};
  }

  /* Метод. Создаем DOM-элемент булета */
  createBullet() {
    function createElement(elType, classes) {
      const elContainer = document.createElement(elType);
      if (Array.isArray(classes) === true) {
        classes.forEach(element => {
          elContainer.classList.add(element);
        });
      }
      else {
        elContainer.classList.add(classes);
      }
      return elContainer;
    }

    const bulletsContainer = createElement('div', 'slider__bullets');
    const bullet = createElement('button', ['glide__bullet', 'slider__bullet']);

    bulletsContainer.appendChild(bullet);

    return {bulletsContainer};
  }

  /* Метод. Добавим коммит в  */
  addCommit(commit) {
    if (commit instanceof Commit === false) {
      throw "Ожидается элемент типа карточка"
  }
  this.commitsArray.push(commit);
  this.sliderList.appendChild(commit.commitElement);
  }

  /* Метод. Создаем DOM-элемент булета */
  addBullet(bullet) {
    if (bullet instanceof Commit === false) {
      throw "Ожидается элемент типа буллет"
  }
  this.bulletsArray.push(bullet);
  this.bulletList.appendChild(bullet.bulletElement);
  }

  /* Метод. Отрисуем коммит в слайдере */
  render() {

  }
}

export default Commit;
