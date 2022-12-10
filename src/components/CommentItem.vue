<template>
  <h2>This is a comment</h2>
  <p
    v-if="comment"
    v-html="comment.text"></p>
</template>

<script setup>
import useGetStory from '../composables/useGetStory.js';

const props = defineProps({
  comment: Number,
});

const comment = useGetStory(props.comment);
</script>
