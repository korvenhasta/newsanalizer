class Validation {
  constructor() {

  }

  /* Метод. Делаем сообщение об ошибке видимым для валидации */
  activateElementError(element) {
    element.classList.add('popup__container_invalid');
  }

  /* Метод. Обнуляем ошибки для валидации */
  resetElementError(element) {
    element.classList.remove('popup__container_invalid');
    element.textContent = '';
  }

  /* Метод. Валидируем инпуты */
  validateElement(element) {
    const errorElement = element.nextSibling.nextSibling;

    if (element.validity.valueMissing) {
        errorElement.textContent = errorMessageSet.validationRequired;
        this.activateElementError(errorElement);
        return false;
    }

    if (element.validity.patternMismatch) {
        errorElement.textContent = errorMessageSet.validationLink;
        this.activateElementError(errorElement);
        return false;
    }

    if (element.validity.tooShort) {
        errorElement.textContent = errorMessageSet.validationLength;
        this.activateElementError(errorElement);
        return false;
    }

    this.resetElementError(errorElement);
    return true;
  }

}
