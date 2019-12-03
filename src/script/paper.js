import "../pages/paper.css";
import { setTextContent } from './htmlHelper.js'
import { siteConfig } from './siteConfig.js';

window.onload = () => {
  const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
  const ticksPerDay = 24 * 60 * 60 * 1000;

  const analiticsBarContainer = document.querySelector('.analitics__container');
  const analiticsBars = analiticsBarContainer.querySelectorAll('.analitics__bar');
  const analiticsDateContainer = document.querySelector('.analitics__container-column_left');
  const analiticsDates = analiticsDateContainer.querySelectorAll('.analitics__date');

  function weekFormat(date) {
    return date.getDate() + ', ' + siteConfig.localisation.ru.calendar.weekDays[date.getDay()];
  }

  /* Метод. Посчитаем ключевое слово в заголовках и описании новости */
  function countOccurences(phrase, text) {
    if (text === null) {
      return 0;
    }
    phrase = phrase.toLowerCase();
    text = text.toLowerCase();
    let counter = 0;
    let currentPosition = 0;
    let newPosition = 0;
    while ((newPosition = text.indexOf(phrase, currentPosition)) !== -1) {
      counter += 1;
      currentPosition = newPosition + phrase.length;
    }
    return counter;
  }

  /* Метод. Посчитаем цифры для таблички с аналитикой */
  function calculateAnaliyics(topic, news) {
    const articlesByDay = news.reduce((prevVal, element) => {
      const resHeadings = countOccurences(topic, element.title);
      const resDescription = countOccurences(topic, element.description);

      const dayOfWeek = new Date(element.publishedAt).getDay();

      prevVal[dayOfWeek] = {
        numHeadings: resHeadings + prevVal[dayOfWeek].numHeadings,
        numDescription: resDescription + prevVal[dayOfWeek].numDescription
      };

      return prevVal;
    }, Array(7).fill({ numHeadings: 0, numDescription: 0 }));

    const headingsCount = articlesByDay.reduce((sum, element) => {
      return element.numHeadings + sum;
    }, 0);

    return {
      articlesByDay: articlesByDay,
      headings: headingsCount
    }
  }

  /* Метод. Нарисуем бары (значения и полоски) */
  function drawBars(searchDay, analitics) {
    analiticsBars.forEach((bar, index) => {
      const currentDay = new Date((searchDay.getTime() - (index - 6) * ticksPerDay)).getDay();
      const dayArticles = analitics.articlesByDay[currentDay];

      const sum = dayArticles.numHeadings + dayArticles.numDescription;
      bar.textContent = sum;
      if (sum > 1) {
        bar.style.width = `${sum}%`;
      }
    });
  }

  /* Метод. Проверим данные, которые приходят из localStorage. воспользуемся arguments для того, чтобы не передавать все аргументы */
  function checkData() {
    return [...arguments].reduce((exists, element) => {
      return exists && element != null && element != undefined;
    }, true);
  }

  /* Метод. Загрузим данные, которые приходят из localStorage */
  function loadData() {
    const topic = window.localStorage.getItem('topic');
    const timeStampString = window.localStorage.getItem('timeStamp');
    const newsString = window.localStorage.getItem('news');
    const totalResults = window.localStorage.getItem('totalResults');

    if (checkData(topic, timeStamp, news, totalResults)) {
      window.location = "/index.html";
    }

    const timeStamp = new Date(Number(timeStampString));
    const news = JSON.parse(newsString);

    return { timeStamp, topic, totalResults, news };
  }

  /* Метод. Получим массив месяцев для отображения в таблице с барами */
  function getMonthName(timeStamp) {
    return months[timeStamp.getMonth()];
  }

  /* Метод. Посчитаем даты 7 дней от текущей и запишем их в таблицу */
  function setWeekDates(searchDate) {
    let offSet = -6;
    analiticsDates.forEach(element => {
      const currentDate = new Date(searchDate.getTime());
      const offsetDate = new Date(currentDate.setDate(currentDate.getDate() + offSet));
      element.textContent = weekFormat(offsetDate);
      offSet += 1;
    });
  }

  /* Метод. Получим данные для аналитики из localStorage и вызовем фунцию подсчета цифр */
  function getAnaliyics(topic, news) {
    const analiticsString = window.localStorage.getItem('analitics');

    if (analiticsString === null || analiticsString === undefined) {
      const analitics = calculateAnaliyics(topic, news);
      window.localStorage.setItem('analitics', JSON.stringify(analitics));
      return analitics;
    }
    else {
      return JSON.parse(analiticsString);
    }
  }

  const { timeStamp, topic, totalResults, news } = loadData(); // воспользуемся деструктуризацией

  setTextContent('.analitics__month', getMonthName(timeStamp));
  setWeekDates(timeStamp);
  setTextContent('.summary__title_span', topic);
  setTextContent('.summary__text_total', totalResults);

  const analitics = getAnaliyics(topic, news);
  setTextContent('.summary__text_headings', analitics.headings);

  drawBars(timeStamp, analitics);
}
