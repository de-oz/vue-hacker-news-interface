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
import StoryItem from '../components/StoryItem.vue';
import { toRef, onBeforeUnmount } from 'vue';
import { state } from '../stores/newsStore.js';

const news = toRef(state, 'news');

state.update();

onBeforeUnmount(() => clearInterval(state.intervalId));

function refresh() {
  clearInterval(state.intervalId);
  state.update();
}
</script>
