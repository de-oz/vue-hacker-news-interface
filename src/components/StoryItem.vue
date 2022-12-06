<script setup>
const props = defineProps({
  story: Object,
});
</script>

<template>
  <li>
    <h3>
      <RouterLink
        :to="{ name: 'story', params: { id: props.story.value?.id || 0 } }">
        {{ props.story.value?.title }}
      </RouterLink>
    </h3>
    <p>
      Author: {{ props.story.value?.by }} | Comments:
      {{ props.story.value?.descendants }} | Time:
      {{ new Date(props.story.value?.time).toLocaleTimeString() }}
    </p>
  </li>
</template>
