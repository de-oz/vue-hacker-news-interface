<template>
  <h2>Story Page</h2>
  <p>Story ID: {{ id }}</p>

  <template v-if="item">
    <div>
      <h2>
        {{ item.title }}
        <a
          :href="item.url"
          target="_blank"
          rel="noreferrer">
          {{ item.url }}
        </a>
      </h2>
      <div>
        Author: <span>{{ item.by }}</span>
      </div>
      <div>Date: {{ new Date(item.time * 1000).toLocaleString() }}</div>
    </div>

    <h3>Comments: {{ item.descendants }}</h3>
  </template>
  <h3 v-else>LOADING...</h3>
</template>

<script setup>
import useGetStory from '../composables/useGetStory.js';

const props = defineProps({
  id: { type: Number, required: true },
});

const item = useGetStory(props.id);
</script>
