<template>
  <button @click="refresh">Refresh</button>

  <ul v-if="response">
    <StoryItem
      v-for="story of response"
      :story="story"
      :key="story.id" />
  </ul>
  <h2 v-else>LOADING...</h2>
</template>

<script setup>
import useGetNews from '../composables/useGetNews.js';
import StoryItem from '../components/StoryItem.vue';
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';

const listLength = 3;

const response = ref(null);

const intervalId = setInterval(() => useGetNews(response, listLength), 30000);

onBeforeMount(() => useGetNews(response, listLength));
onBeforeUnmount(() => clearInterval(intervalId));

function refresh() {
  useGetNews(response, listLength);
}
</script>
