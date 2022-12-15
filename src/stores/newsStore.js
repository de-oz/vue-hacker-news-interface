import { reactive, toRef } from 'vue';
import useGetNews from '../composables/useGetNews.js';

export const state = reactive({
  news: null,
  intervalId: 0,

  update() {
    const news = toRef(this, 'news');
    useGetNews(news, 5);
    this.intervalId = setInterval(() => useGetNews(news, 5), 30000);
  },
});
