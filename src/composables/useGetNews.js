import axios from 'axios';
import useGetStory from './useGetStory.js';
import { ref } from 'vue';

export default function useGetNews(n) {
  const response = ref(null);

  (async () => {
    try {
      let { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/newstories.json`
      );

      data = await Promise.all(data.slice(0, n).map(useGetStory));

      response.value = data;
    } catch (error) {
      console.log('Failed to get a news list: ', error);
    }
  })();

  return { response };
}
