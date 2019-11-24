import "../pages/paper.css";
import NewsApi from './newsapi.js'

//const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'


const newsApi = new NewsApi('2c4b1b51dd004658ae3055a2eb42a668');

newsApi.getNews('наука', news => console.log(news));
