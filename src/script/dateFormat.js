import { siteConfig } from './siteConfig.js'

/* Функция для форматирования даты */
export default function dateFormat(date) {
  return `${date.getDate()} ${siteConfig.localisation.ru.calendar.month[date.getMonth()]}, ${date.getFullYear()}`;
}
