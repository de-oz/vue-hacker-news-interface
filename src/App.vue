<script setup>
import useGetNews from './composables/useGetNews.js';
import StoryItem from './components/StoryItem.vue';

const NEWS_LIST_LENGTH = 5;

const { response } = useGetNews(NEWS_LIST_LENGTH);
</script>

<template>
  <h1>Hacker News Interface</h1>

  <ul>
    <StoryItem
      v-for="story of response"
      :story="story"
      :key="story.id" />
  </ul>
</template>

<style scoped></style>
