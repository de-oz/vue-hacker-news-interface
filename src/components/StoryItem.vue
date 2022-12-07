<script setup>
const props = defineProps({
  story: Object,
});
</script>

<template>
  <li v-if="props.story.value">
    <h3>
      <RouterLink :to="{ name: 'story', params: { id: props.story.value.id } }">
        {{ props.story.value.title }}
      </RouterLink>
    </h3>
    <p>
      Author: {{ props.story.value.by }} | Comments:
      {{ props.story.descendants }} | Time:
      {{ new Date(props.story.value.time).toLocaleTimeString() }}
    </p>
  </li>
  <h3 v-else>LOADING...</h3>
</template>
