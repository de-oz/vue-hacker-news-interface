import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGetNews } from '../composables/useGetNews';

export const useNewsStore = defineStore('news', () => {
  const news = ref(null);
  const intervalId = ref(null);

  function updateNews(newsCategory, intervalDelay, listLength) {
    useGetNews(news, newsCategory, listLength);

    clearInterval(intervalId.value);

    intervalId.value = setInterval(
      () => useGetNews(news, newsCategory, listLength),
      intervalDelay * 1000
    );
  }

  return { news, intervalId, updateNews };
});
