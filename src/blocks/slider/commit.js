import dateFormat from '../../script/dateFormat.js'
import { createElement } from '../../script/htmlHelper.js'

class Commit {
  constructor(name, email, date, message, avatarUrl) {
    this.name = name;
    this.email = email;
    this.date = date;
    this.message = message;
    this.avatarUrl = avatarUrl;
    this.element = this.createCommit();
  }

  /* Метод. Создаем DOM-элемент коммита */
  createCommit() {
    const liItem = createElement('li', 'glide__slide');
    const commitContainer = createElement('div', 'slider__card');

    const date = createElement('time', 'slider__date');
    const commitDate = new Date(this.date);
    date.textContent = dateFormat(commitDate);

    const userContainer = createElement('div', 'slider__user');
    const avatar = createElement('img', 'slider__user-avatar');
    avatar.setAttribute('src', this.avatarUrl);
    avatar.setAttribute('alt', 'Аватар пользователя');

    const infoContainer = createElement('div', 'slider__user-info');
    const userName = createElement('h3', ['section-title', 'section-title_size_medium', 'slider__user-name']);
    userName.textContent = this.name;

    const email = createElement('p', ['content-text', 'content-text_size_small', 'slider__user-email']);
    email.textContent = this.email;

    const userComment = createElement('p', ['content-text', 'content-text_size_medium', 'slider__user-comment']);
    userComment.textContent = this.message;

    liItem.appendChild(commitContainer);
    commitContainer.appendChild(date);
    commitContainer.appendChild(userContainer);
    commitContainer.appendChild(userComment);

    userContainer.appendChild(avatar);
    userContainer.appendChild(infoContainer);

    infoContainer.appendChild(userName);
    infoContainer.appendChild(email);

    return liItem;
  }
}

export default Commit;
