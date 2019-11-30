import "../vendor/glide.core.css";
import "../vendor/glide.theme.css";
import "../pages/about.css";
import Glide, { Breakpoints } from '../../node_modules/@glidejs/glide/dist/glide'
import GithubApi from './ghapi.js';
import Commit from './commit.js';
import {sliderConfig} from './sliderConfig.js'

window.onload = () => {
  /* Метод. Добавим слайдер на страницу */
  function showSlider() {
    const slider = document.querySelector('.slider_hidden');
    slider.classList.remove('slider_hidden');
  }

  /* Метод. Нарисуем карточки с коммитами */
  function displayCommits(commits) {
    const commitList = document.querySelector('.glide__slides');
    for (let i=0; i<commits.length; i++) {
      let commit = commits[i];
      let myCommit = new Commit(commit.commit.author.name, commit.commit.author.email, commit.commit.author.date, commit.commit.message, commit.author.avatar_url);
      commitList.appendChild(myCommit.element);
    }
  }

  const ghApi = new GithubApi('korvenhasta', 'newsanalizer');
  const slider = new Glide('.glide', sliderConfig);

  ghApi.getCommits(commits =>
    {
      if (commits.length === 0) {
        return;
      }
      showSlider();
      displayCommits(commits);
      slider.mount();
    },
    (error) => {
      setTimeout( () => alert('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз') , 50);
    }
  );
}
