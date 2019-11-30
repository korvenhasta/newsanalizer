import "../vendor/glide.core.css";
import "../vendor/glide.theme.css";
import "../pages/about.css";

import Glide from '../../node_modules/@glidejs/glide/dist/glide'
import GithubApi from './ghapi.js';
import Commit from './commit.js';

import { sliderConfig } from './sliderConfig.js'
import { siteConfig } from './siteConfig.js';

window.onload = () => {
  /* Метод. Добавим слайдер на страницу */
  function showSlider() {
    const slider = document.querySelector('.slider');
    slider.classList.remove('slider_hidden');
  }

  /* Метод. Нарисуем карточки с коммитами */
  function renderCommits(commits) {
    const commitList = document.querySelector('.glide__slides');

    commits.forEach(response => {
      const commitData = response.commit;
      const myCommit = new Commit(commitData.author.name, commitData.author.email, commitData.author.date, commitData.message, response.author.avatar_url);
      commitList.appendChild(myCommit.element);
    });
  }

  const ghApi = new GithubApi(siteConfig.github.user, siteConfig.github.repository);
  const slider = new Glide('.glide', sliderConfig);

  ghApi.getCommits(commits => {
    if (commits.length === 0) {
      return;
    }
    showSlider();
    renderCommits(commits);
    slider.mount();
  },
    (error) => {
      console.log(error);
      setTimeout(() => alert('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'), 50);
    }
  );
}

