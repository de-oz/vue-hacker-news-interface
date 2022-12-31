import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGetNews } from '../composables/useGetNews';

export const useNewsStore = defineStore('news', () => {
  const news = ref(null);
  const intervalId = ref(null);
  const isLoading = ref(false);

  function updateNews(newsCategory, intervalDelay, listLength) {
    useGetNews(news, newsCategory, listLength, isLoading);

    clearInterval(intervalId.value);

    intervalId.value = setInterval(
      () => useGetNews(news, newsCategory, listLength, isLoading),
      intervalDelay * 1000
    );
  }

  return { news, intervalId, isLoading, updateNews };
});
