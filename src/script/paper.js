import "../pages/paper.css";

window.onload = () => {
  function weekFormat(date) {
    const week = [
      "вс", "пн", "вт", "ср",
      "чт", "пт", "сб"
    ];

    const day = date.getDate();
    const weekIndex = date.getDay();

    return day + ', ' + week[weekIndex];
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

      if (prevVal[dayOfWeek] !== undefined) {
        prevVal[dayOfWeek] = {
          numHeadings: resHeadings + prevVal[dayOfWeek].numHeadings,
          numDescription: resDescription + prevVal[dayOfWeek].numDescription
        };
      }
      else {
        prevVal[dayOfWeek] = {numHeadings: resHeadings, numDescription: resDescription};
      }
      return prevVal;
    }, Array(7).fill());

    const headings = articlesByDay.reduce((sum, element) => {
      if(element === undefined)
        return sum;
      return element.numHeadings + sum;
    }, 0);

    return {
      articlesByDay: articlesByDay,
      headings: headings
    }
  }

  /* Метод. Нарисуем бары (значения и полоски) */
  function drawBars(searchDay, analitics) {
    const analiticsBarContainer = document.querySelector('.analitics__container');
    const analiticsBar = analiticsBarContainer.querySelectorAll('.analitics__bar');

    for (let i=0; i<7; i++) {
      const currentDay = new Date((searchDay.getTime() - (i - 6) * 24 * 60 * 60 * 1000)).getDay();
      let dayArticles = analitics.articlesByDay[currentDay];

      if (dayArticles === undefined) {
        analiticsBar[i].textContent = '0';
      }
      else {
        let sum = dayArticles.numHeadings + dayArticles.numDescription;
        analiticsBar[i].textContent = sum;
        if (sum > 1) {
          analiticsBar[i].style.width = `${sum}%`;
        }
      }
    }
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

    return {timeStamp, topic, totalResults, news};
  }

  /* Метод. Получим массив месяцев для отображения в таблице с барами */
  function getMonthsName(timeStamp) {
    const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    return months[timeStamp.getMonth()];
  }

  /* Метод. Запишем месяц в таблицу */
  function setMonth(timeStamp) {
    const tableTitleMonth = document.querySelector('.analitics__month');
    tableTitleMonth.textContent = getMonthsName(timeStamp);
  }

  /* Метод. Посчитаем даты 7 дней от текущей и запишем их в таблицу */
  function setWeekDates(searchDate) {
    const analiticsDateContainer = document.querySelector('.analitics__container-column_left');
    const analiticsDate = analiticsDateContainer.querySelectorAll('.analitics__date');
    let offSet = -6;
    analiticsDate.forEach(element => {
      const today = new Date(searchDate.getTime());
      const weekAgo = new Date(today.setDate(today.getDate() + offSet));
      element.textContent = weekFormat(weekAgo);
      offSet +=1;
    });
  }

  /* Метод. Запишем тему, которую искал пользователь в заголовок */
  function setTopic(searchTopic) {
    const summaryTitle = document.querySelector('.summary__title_span');
    summaryTitle.textContent = searchTopic;
  }

  /* Метод. Запишем totalResults в шапку */
  function setTotalResults(searchTotalResults) {
    const summaryTextTotal = document.querySelector('.summary__text_total');
    summaryTextTotal.textContent = searchTotalResults;
  }

  /* Метод. Запишем количество упоминаний в шапку */
  function setHeadingsCount(count) {
    const summaryTextHeadings = document.querySelector('.summary__text_headings');
    summaryTextHeadings.textContent = count;
  }

  /* Метод. Получим данные для аналитики из localStorage и вызовем фунцию подсчета цифр */
  function getAnaliyics(topic, news) {
    const analiticsString = window.localStorage.getItem('analitics');
    let analitics = null;

    if (analiticsString === null || analiticsString === undefined) {
      analitics = calculateAnaliyics(topic, news);
      window.localStorage.setItem('analitics', JSON.stringify(analitics));
    }
    else {
      analitics = JSON.parse(analiticsString);
    }

    return analitics;
  }

  const {timeStamp, topic, totalResults, news} = loadData(); // воспользуемся деструктуризацией

  setMonth(timeStamp);
  setWeekDates(timeStamp);
  setTopic(topic);
  setTotalResults(totalResults);

  const analitics = getAnaliyics(topic, news);
  setHeadingsCount(analitics.headings);

  drawBars(timeStamp, analitics);
}
