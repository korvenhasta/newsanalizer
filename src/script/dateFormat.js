const months = [
  "января", "февраля", "марта",
  "апреля", "мая", "июня", "июля",
  "августа", "сентября", "октября",
  "ноября", "декабря"
];

/* Функция для форматирования даты */
export default function dateFormat(date) {
  return `${date.getDate()} ${months[date.getMonth()]}, '${date.getFullYear()}`;
}
