class Validation {
  constructor(message) {

  }

  /* Метод. Делаем сообщение об ошибке видимым для валидации */
  activateElementError(element) {
    element.classList.add('search__error-message');
  }

  /* Метод. Обнуляем ошибки для валидации */
  resetElementError(element) {
    element.classList.remove('search__error-message');
    element.textContent = '';
  }

  /* Метод. Валидируем инпуты */
  validateElement(element) {
    const errorElement = element.nextSibling.nextSibling;

    if (element.validity.valueMissing) {
        errorElement.textContent = 'Нужно ввести ключевое слово';
        this.activateElementError(errorElement);
        return false;
    }

    this.resetElementError(errorElement);
    return true;
  }

}
