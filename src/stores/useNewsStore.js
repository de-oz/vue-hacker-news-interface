import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGetNews } from '../composables/useGetNews';

export const useNewsStore = defineStore('news', () => {
  const news = ref(null);
  const intervalId = ref(0);

  function updateNews() {
    useGetNews(news, 5);
    intervalId.value = setInterval(() => useGetNews(news, 5), 30000);
  }

  return { news, intervalId, updateNews };
});
