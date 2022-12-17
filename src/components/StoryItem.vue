<template>
  <li v-if="story && !story.deleted && !story.dead">
    <h3>
      <RouterLink :to="{ name: 'story', params: { id: story.id } }">
        {{ story.title }}
      </RouterLink>
    </h3>
    <p>
      Author: {{ story.by }} | Comments: {{ story.descendants }} | Time:
      {{ new Date(story.time).toLocaleTimeString() }}
    </p>
  </li>
</template>

<script setup>
import { toRef } from 'vue';

const props = defineProps({
  story: Object,
});

const story = toRef(props, 'story');
</script>
