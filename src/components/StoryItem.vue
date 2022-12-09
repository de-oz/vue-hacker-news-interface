<script setup>
defineProps({
  story: Object,
});
</script>

<template>
  <li v-if="story.value">
    <h3>
      <RouterLink :to="{ name: 'story', params: { id: story.value.id } }">
        {{ story.value.title }}
      </RouterLink>
    </h3>
    <p>
      Author: {{ story.value.by }} | Comments: {{ story.value.descendants }} |
      Time:
      {{ new Date(story.value.time).toLocaleTimeString() }}
    </p>
  </li>
  <h3 v-else>LOADING...</h3>
</template>
