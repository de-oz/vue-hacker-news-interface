<template>
  <li v-if="isValid">
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
import { computed, toRef } from 'vue';

const props = defineProps({
  story: Object,
});

const story = toRef(props, 'story');

const isValid = computed(() => !story.value.deleted && !story.value.dead);
</script>
