export default class Form {
  constructor(element, onSearch) {
    let form = this;
    this._onSearch = onSearch;
    this._isBlocked = false;
    this._searchInput = element.querySelector('.search__input');
    this._searchButton = element.querySelector('.search__button');
    element.addEventListener('submit', target => form.formSubmitHandler(target));
    element.addEventListener('input', target => form.formInputHandler(target));
    this.formInputHandler();
  }

  /* Метод. Блокируем форму */
  block() {
    if(this._isBlocked) {
      return;
    }
    this._isBlocked = true;
    this._searchInput.disabled = true;
    this._searchButton.disabled = true;
  }

  /* Метод. Снимем блокировку с формы */
  unBlock() {
    if(!this._isBlocked) {
      return;
    }
    this._isBlocked = false;
    this._searchInput.disabled = false;
    this._searchButton.disabled = false;
  }

  /* Метод. Переключим  */
  formSubmitHandler(event) {
    event.preventDefault();
    if(!this._searchInput.checkValidity()) {
      return;
    }
    if(this._isBlocked) {
      return;
    }
    this.block();
    this._onSearch(this._searchInput.value);
  }

  /* Метод. Валидируем инпут */
  formInputHandler() {
    if (this._searchInput.value === "") {
      this._searchInput.setCustomValidity("Нужно ввести ключевое слово");
    }
    else {
      this._searchInput.setCustomValidity("");
    }
  }
}
