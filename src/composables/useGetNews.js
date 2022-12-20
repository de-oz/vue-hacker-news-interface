import axios from 'axios';
import { useGetStory } from './useGetStory';

export async function useGetNews(news, n) {
  try {
    news.value = null;

    let { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/topstories.json`
    );

    data = await Promise.all(data.slice(0, n).map((id) => useGetStory(id)));

    news.value = data;
  } catch (error) {
    console.log('Failed to get a news list: ', error);
  }
}
