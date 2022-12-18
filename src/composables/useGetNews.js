import axios from 'axios';

export async function useGetNews(news, n) {
  try {
    news.value = null;

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
  } catch (error) {
    console.log('Failed to get a news list: ', error);
  }
}
