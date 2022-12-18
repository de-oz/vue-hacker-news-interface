<template>
  <button @click="refresh">Refresh</button>

  <ul v-if="news">
    <StoryItem
      v-for="story of news"
      :story="story"
      :key="story.id" />
  </ul>
  <h1 v-else>LOADING...</h1>
</template>

<script setup>
import { onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import StoryItem from '../components/StoryItem.vue';
import { useNewsStore } from '../stores/useNewsStore.js';

const store = useNewsStore();
const { news, intervalId } = storeToRefs(store);
const { updateNews } = store;

updateNews();

onUnmounted(() => clearInterval(intervalId.value));

function refresh() {
  clearInterval(intervalId.value);
  updateNews();
}
</script>
