import "../pages/about.css";
import Glide, { Breakpoints } from '../../node_modules/@glidejs/glide/dist/glide'

new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 3,
  peek: 88,
  focusAt: 0,
  gap: 16,
  breakpoints: {
    1440: {
      type: "carousel",
      perView: 3,
      startAt: 0,
      focusAt: 0,
      gap: 16
    },
    768: {
      type: "slider",
      perView: 2,
      startAt: 0,
      focusAt: 0,
      peek: {
        before: 0,
        after: 70
      },
      gap: 8
    },
    576: {
      type: "slider",
      perView: 1,
      startAt: 0,
      focusAt: 0,
      peek: 0,
      gap: 8
    }
  }
}).mount()

//const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'
