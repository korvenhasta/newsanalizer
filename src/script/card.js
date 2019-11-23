class Card {
  constructor(image, date, title, text, source) {

  }

  /* Метод. Создаем DOM-элемент карточки */
  create() {
    function createElement(elType, classes) {
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

  const imageContainer = createElement('img', 'result-card__image');
  imageContainer.setAttribute('src', `background-image: url(${cardImage})`);

  const descriptionContainer = createElement('div', 'result-card__description');

  const date = createElement('time', 'result-card__date');

  const textContainer = createElement('div', 'result-card__container');

  const cardTitle = createElement('h3', ['section-title', 'section-title_size_medium', 'result-card__name']);

  const cardText = createElement('p', ['content-text', 'content-text_size_medium', 'result-card__annotation']);

  const cardSource = createElement('p', 'result-card__source');

  cardContainer.appendChild(imageContainer);
  cardContainer.appendChild(descriptionContainer);

  descriptionContainer.appendChild(date);
  descriptionContainer.appendChild(textContainer);
  descriptionContainer.appendChild(cardSource);

  textContainer.appendChild(cardTitle);
  textContainer.appendChild(cardText);

  return {cardContainer}
  }
}
