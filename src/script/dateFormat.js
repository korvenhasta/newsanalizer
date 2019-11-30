/* Функция для форматирования даты */
export default function dateFormat(date) {
  const month = [
    "января", "февраля", "марта",
    "апреля", "мая", "июня", "июля",
    "августа", "сентября", "октября",
    "ноября", "декабря"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + ' ' + month[monthIndex] + ', ' + year;
}
