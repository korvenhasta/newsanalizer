/* Метод. Создадим DOM элемент */
function createElement(tag, classes) {
  const element = document.createElement(tag);
  if (Array.isArray(classes)) {
    classes.forEach(item => {
      element.classList.add(item);
    });
  }
  else {
    element.classList.add(classes);
  }
  return element;
}

/* Метод. Посетим текст */
function setTextContent(className, textContent) {
  const element = document.querySelector(className);
  element.textContent = textContent;
}

export {createElement, setTextContent};
