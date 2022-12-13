import axios from 'axios';

export default async function useGetNews(news, n, isLoading) {
  try {
    isLoading.value = true;
    let { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/topstories.json`
    );

    data = await Promise.all(
      data.slice(0, n).map(async (id) => {
        try {
          const { data } = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );

          return data;
        } catch (error) {
          console.log('Failed to get a story: ', error);
        }
      })
    );

    news.value = data;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.log('Failed to get a news list: ', error);
  }
}
