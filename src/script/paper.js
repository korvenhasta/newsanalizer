import "../pages/paper.css";

const topic = window.localStorage.getItem('topic');
const timeStamp = Number(window.localStorage.getItem('timeStamp'));

const summaryTitle = document.querySelector('.summary__title_span');
summaryTitle.textContent = topic;

const summaryTextTotal = document.querySelector('.summary__text_total');

const summaryTextHeadings = document.querySelector('.summary__text_headings');

function starter() {
  const tableTitleMonth = document.querySelector('.analitics__month');
  const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
  tableTitleMonth.textContent = months[new Date().getMonth()];

  const analiticsDateContainer = document.querySelector('.analitics__container-column_left');
  const analiticsDate = analiticsDateContainer.querySelectorAll('.analitics__date');

  let offSet = -6;
  analiticsDate.forEach(element => {
    const today = new Date(timeStamp);
    const weekAgo = new Date(today.setDate(today.getDate() + offSet));
    element.textContent = weekFormat(weekAgo);
    offSet +=1;
  });

}

if (topic === null || topic === undefined || summaryTitle.textContent === '') {
  window.location = "/index.html";
}

function weekFormat(date) {
  let week = [
    "вс", "пн", "вт", "ср",
    "чт", "пт", "сб"
  ];

  let day = date.getDate();
  let weekIndex = date.getDay();

  return day + ', ' + week[weekIndex];
}

/* Метод. Посчитаем ключевое слово в заголовках и описании новости */
function countHeadings(topic, str2) {
  if (str2 === null) {
    return 0;
  }
  topic = topic.toLowerCase();
  str2 = str2.toLowerCase();
  let counter = 0;
  let currPos = 0;
  let newPos = 0;
  while ((newPos = str2.indexOf(topic, currPos)) !== -1) {
    counter += 1;
    currPos = newPos + topic.length;
  }
  return counter;
}

function getAnaliyics(topic, news) {
  let articlesByDay = news.reduce((prevVal, element) => {
    let resHeadings = countHeadings(topic, element.title);

    let resDescription = countHeadings(topic, element.description);
    let dayOfWeek = new Date(element.publishedAt).getDay();

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

  let headings = articlesByDay.reduce((sum, element) => {
    if(element === undefined)
      return sum;
    return element.numHeadings + sum;
  }, 0);

  return {
    articlesByDay: articlesByDay,
    headings: headings
  }
}

/* Метод. Разберем новость, полученную от API */
//newsApi.getNews(topic, news => {

  let news = JSON.parse(window.localStorage.getItem('news'));
  let totalResults = window.localStorage.getItem('totalResults');

  console.log(news);
  summaryTextTotal.textContent = totalResults;

  let analitics = JSON.parse(window.localStorage.getItem('analitics'));

  if (analitics === null || analitics === undefined) {
    analitics = getAnaliyics(topic, news);
    window.localStorage.setItem('analitics', JSON.stringify(analitics));
  }

  summaryTextHeadings.textContent = analitics.headings;

  const analiticsBarContainer = document.querySelector('.analitics__container');
  const analiticsBar = analiticsBarContainer.querySelectorAll('.analitics__bar');

  const today = new Date(timeStamp);

  for (let i=0; i<7; i++) {
    const currentDay = new Date((today - (i - 6) * 24 * 60 * 60 * 1000)).getDay();
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


//});

starter();
