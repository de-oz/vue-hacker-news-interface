import axios from 'axios';

export async function useGetStory(story, id) {
  try {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );

    story.value = data;
  } catch (error) {
    console.log('Failed to get a story: ', error);
  }
}
