<template>
  <li v-if="comment">
    <h4>
      by {{ comment.by }}; posted:
      {{ new Date(comment.time * 1000).toLocaleString() }}
    </h4>

    <p v-html="comment.text"></p>

    <ul v-if="comment.kids">
      <CommentItem
        v-for="commentId of comment.kids"
        :key="commentId"
        :commentId="commentId" />
    </ul>
  </li>
</template>

<script setup>
import useGetStory from '../composables/useGetStory.js';
import { ref } from 'vue';

const props = defineProps({
  commentId: Number,
});

const comment = ref(null);
useGetStory(comment, props.commentId);
</script>
