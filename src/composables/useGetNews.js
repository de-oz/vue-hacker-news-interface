import axios from 'axios';
import useGetStory from './useGetStory.js';

export default function useGetNews(ref, n) {
  (async () => {
    try {
      let { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/newstories.json`
      );

      data = await Promise.all(data.slice(0, n).map(useGetStory));

      ref.value = data;
    } catch (error) {
      console.log('Failed to get a news list: ', error);
    }
  })();
}
