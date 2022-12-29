import axios from 'axios';
import { useGetStory } from './useGetStory';

export async function useGetNews(news, category) {
  try {
    news.value = null;

    let { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/${category.value}stories.json`
    );

    data = await Promise.all(data.slice(0, 25).map((id) => useGetStory(id)));

    news.value = data;
  } catch (error) {
    console.log('Failed to get a news list: ', error);
  }
}
