import axios from 'axios';

export default function useGetStory(ref, id) {
  (async () => {
    try {
      const { data } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );

      ref.value = data;
    } catch (error) {
      console.log('Failed to get a story: ', error);
    }
  })();
}
