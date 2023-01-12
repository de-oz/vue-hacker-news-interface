import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Loading, QSpinnerGears } from 'quasar';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Quasar, {
  plugins: {
    Loading,
  },
  config: {
    loading: {
      spinner: QSpinnerGears,
      customClass: 'loading',
    },
  },
});

app.provide('dayjs', dayjs);

app.mount('#app');
