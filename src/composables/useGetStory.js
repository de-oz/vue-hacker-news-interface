import axios from 'axios';

export async function useGetStory(id, ref = null) {
  try {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );

    if (ref) {
      ref.value = data;
    } else {
      return data;
    }
  } catch (error) {
    console.log('Failed to get a story: ', error);
  }
}
