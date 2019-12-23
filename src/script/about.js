import "../vendor/glide.core.css";
import "../vendor/glide.theme.css";
import "../pages/about.css";

import Glide from '@glidejs/glide';
import GithubApi from './ghapi.js';
import Commit from '../blocks/slider/commit.js';

import { sliderConfig } from './sliderConfig.js'
import { siteConfig } from './siteConfig.js';

window.onload = () => {
  const commitList = document.querySelector('.glide__slides');
  const ghApi = new GithubApi(siteConfig.github.user, siteConfig.github.repository);
  const slider = new Glide('.glide', sliderConfig);

  /* Метод. Добавим слайдер на страницу */
  function showSlider() {
    const slider = document.querySelector('.slider');
    slider.classList.remove('slider_hidden');
  }

  /* Метод. Нарисуем карточки с коммитами */
  function renderCommits(commits) {
    commits.forEach(response => {
      const commitData = response.commit;
      const myCommit = new Commit(commitData.author.name, commitData.author.email, commitData.author.date, commitData.message, response.author.avatar_url);
      commitList.appendChild(myCommit.element);
    });
  }

  /* Метод. Загрузим данные, которые приходят из sessionStorage */
  function loadData() {
    const commitsString = window.sessionStorage.getItem('commits');
    const commits = JSON.parse(commitsString);

    return commits;
  }

  /* Метод. Вызовем функции для отрисовки коммитов */
  function drawCommits(commits) {
    showSlider();
    renderCommits(commits);
    slider.mount();
  }

  const loadCommits = loadData();

  if (loadCommits != null) {
    drawCommits(loadCommits);
  }
  else {
    ghApi.getCommits(commits => {
      if (commits.length === 0) {
        return;
      }
      window.sessionStorage.clear();
      window.sessionStorage.setItem('commits', JSON.stringify(commits));
      drawCommits(commits);
    },
      error => {
        console.log(error);
        setTimeout(() => alert('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'), 50);
      }
    );
  }
}

