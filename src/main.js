import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bulma/css/bulma.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  faPlus,
  faTimes,
  faChevronUp,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faTimes, faChevronUp, faPen);

createApp(App)
  .use(store)
  .use(router)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app');
