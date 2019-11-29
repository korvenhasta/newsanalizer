import dateFormat from './dateFormat.js'

class Card {
  constructor(image, date, title, text, source, url) {
    let card = this;
    this.image = image;
    this.date = date;
    this.title = title;
    this.text = text;
    this.source = source;
    this.url = url;
    this.element = this.createCard();
  }

  /* Метод. Создаем DOM-элемент карточки */
  createCard() {
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

  const cardContainer = createElement('article', 'result-card');
  cardContainer.setAttribute('data-url', this.url);

  const imageContainer = createElement('img', 'result-card__image');
  imageContainer.setAttribute('src', this.image);
  imageContainer.setAttribute('alt', this.title);

  const descriptionContainer = createElement('div', 'result-card__description');

  const date = createElement('time', 'result-card__date');
  date.textContent = dateFormat(this.date);

  const textContainer = createElement('div', 'result-card__container');

  const cardTitle = createElement('h3', ['section-title', 'section-title_size_medium', 'result-card__name']);
  cardTitle.textContent = this.title;

  const cardText = createElement('p', ['content-text', 'content-text_size_medium', 'result-card__annotation']);
  cardText.textContent = this.text;

  const cardSource = createElement('p', 'result-card__source');
  cardSource.textContent = this.source;

  cardContainer.appendChild(imageContainer);
  cardContainer.appendChild(descriptionContainer);

  descriptionContainer.appendChild(date);
  descriptionContainer.appendChild(textContainer);
  descriptionContainer.appendChild(cardSource);

  textContainer.appendChild(cardTitle);
  textContainer.appendChild(cardText);

  return cardContainer;
  }
}

export default Card;
