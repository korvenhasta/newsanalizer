 /* Метод. Проверим данные, которые приходят из localStorage. воспользуемся arguments для того, чтобы не передавать все аргументы */
export default function checkData() {
  return [...arguments].reduce((exists, element) => {
    return exists && element != null && element != undefined;
  }, true);
}
