import axios from 'axios';
import { ref } from 'vue';

export default function useGetStory(id) {
  const response = ref(null);

  (async () => {
    try {
      const { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );

      response.value = data;
    } catch (error) {
      console.log('Failed to get a story: ', error);
    }
  })();

  return response;
}
