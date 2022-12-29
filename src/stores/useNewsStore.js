import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGetNews } from '../composables/useGetNews';

export const useNewsStore = defineStore('news', () => {
  const news = ref(null);
  const intervalId = ref(null);

  function updateNews(category) {
    useGetNews(news, category);
    intervalId.value = setInterval(() => useGetNews(news, category), 30000);
  }

  return { news, intervalId, updateNews };
});
