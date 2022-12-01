<script setup>
import { ref } from 'vue';
const props = defineProps({
  story: Object,
});
</script>

<template>
  <li>
    <h3>{{ props.story.value?.title }}</h3>
    <p>
      Author: {{ props.story.value?.by }} | Comments:
      {{ props.story.value?.descendants }} | Time:
      {{ new Date(props.story.value?.time).toLocaleTimeString() }}
    </p>
  </li>
</template>
