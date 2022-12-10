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
let intervalId;

onBeforeMount(() => setData());
onBeforeUnmount(() => clearInterval(intervalId));

function setData() {
  useGetNews(response, listLength);
  intervalId = setInterval(() => useGetNews(response, listLength), 10000);
}

function refresh() {
  clearInterval(intervalId);
  setData();
}
</script>
