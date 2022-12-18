<template>
  <li v-if="isValid">
    <h4>
      by {{ comment.by }}; posted:
      {{ new Date(comment.time * 1000).toLocaleString() }}
    </h4>

    <p v-html="comment.text"></p>

    <template v-if="comment.kids">
      <button
        type="button"
        @click="isExpanded = !isExpanded">
        {{ isExpanded ? 'Collapse' : 'Expand' }}
      </button>

      <ul v-if="isExpanded">
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
    </template>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGetStory } from '../composables/useGetStory.js';

const props = defineProps({
  commentId: Number,
  expand: Boolean, // default is false, nested comments are collapsed by default
});

const isExpanded = ref(props.expand);

const comment = ref(null);
const isValid = computed(() => !comment.value.deleted && !comment.value.dead);

await useGetStory(comment, props.commentId);
</script>
