import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Loading, QSpinnerGears } from 'quasar';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

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
      spinnerColor: 'accent',
      message: 'Updating the news list...',
      messageColor: 'primary',
      backgroundColor: 'secondary',
    },
  },
});

app.mount('#app');
