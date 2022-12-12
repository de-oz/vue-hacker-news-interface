import axios from 'axios';
import useGetStory from './useGetStory.js';
import { ref } from 'vue';

export default function useGetNews(news, n) {
  (async () => {
    try {
      let { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/topstories.json`
      );

      data = data.slice(0, n).map((id) => {
        const story = ref(null);
        useGetStory(story, id);
        return story;
      });

      news.value = data;
    } catch (error) {
      console.log('Failed to get a news list: ', error);
    }
  })();
}
