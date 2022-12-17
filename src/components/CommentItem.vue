<template>
  <li v-if="comment && !comment.deleted && !comment.dead">
    <h4>
      by {{ comment.by }}; posted:
      {{ new Date(comment.time * 1000).toLocaleString() }}
    </h4>

    <p v-html="comment.text"></p>

    <button
      v-if="comment.kids"
      type="button"
      @click="isExpanded = !isExpanded">
      {{ isExpanded ? 'Collapse' : 'Expand' }}
    </button>

    <ul v-if="comment.kids && isExpanded">
      <Suspense
        v-if="!expand"
        timeout="0">
        <CommentItem
          v-for="commentId of comment.kids"
          :key="commentId"
          :commentId="commentId"
          expand />

        <template #fallback>
          <h1>LOADING...</h1>
        </template>
      </Suspense>

      <CommentItem
        v-else
        v-for="commentId of comment.kids"
        :key="commentId"
        :commentId="commentId"
        expand />
    </ul>
  </li>
</template>

<script setup>
import useGetStory from '../composables/useGetStory.js';
import { ref } from 'vue';

const props = defineProps({
  commentId: Number,
  expand: Boolean, // default is false, nested comments are collapsed by default
});

const isExpanded = ref(props.expand);
const comment = ref(null);
await useGetStory(comment, props.commentId);
</script>
