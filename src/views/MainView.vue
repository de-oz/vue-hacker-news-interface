<template>
  <button @click="refresh">Refresh</button>

  <ul v-if="!isLoading">
    <StoryItem
      v-for="story of news"
      :story="story"
      :key="story.id" />
  </ul>
  <h1 v-else>LOADING...</h1>
</template>

<script setup>
import useGetNews from '../composables/useGetNews.js';
import StoryItem from '../components/StoryItem.vue';
import { ref, onBeforeUnmount } from 'vue';

const news = ref(null);
const isLoading = ref(false);

const listLength = 5;
let intervalId;

setData();

onBeforeUnmount(() => clearInterval(intervalId));

function setData() {
  useGetNews(news, listLength, isLoading);
  intervalId = setInterval(
    () => useGetNews(news, listLength, isLoading),
    30000
  );
}

function refresh() {
  clearInterval(intervalId);
  setData();
}
</script>
