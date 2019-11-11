import "../pages/about.css";
import Glide from '../../node_modules/@glidejs/glide/dist/glide'

new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 3,
  peek: 88,
  focusAt: 'center'
}).mount()

//const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'
