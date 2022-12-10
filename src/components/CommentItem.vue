<template>
  <li v-if="comment?.by">
    <h4>
      by {{ comment.by }}; posted:
      {{ new Date(comment.time * 1000).toLocaleString() }}
    </h4>

    <p v-html="comment.text"></p>

    <ul v-if="comment.kids">
      <CommentItem
        v-for="commentId of comment.kids"
        :key="commentId"
        :comment="commentId" />
    </ul>
  </li>
</template>

<script setup>
import useGetStory from '../composables/useGetStory.js';

const props = defineProps({
  comment: Number,
});

const comment = useGetStory(props.comment);
</script>
