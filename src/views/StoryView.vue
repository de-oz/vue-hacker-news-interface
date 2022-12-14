<template>
  <button
    @click="() => router.push({ name: 'main' })"
    type="button">
    Back to Main Page
  </button>

  <template v-if="story">
    <div>
      <h2>
        {{ story.title }}
        <a
          :href="story.url"
          target="_blank"
          rel="noreferrer">
          {{ story.url }}
        </a>
      </h2>
      <div>
        Author: <span>{{ story.by }}</span>
      </div>
      <div>Date: {{ new Date(story.time * 1000).toLocaleString() }}</div>
    </div>

    <h3>Comments: {{ story.descendants }}</h3>

    <button @click="refresh">Refresh</button>

    <Suspense :timeout="0">
      <ul :key="story.descendants">
        <CommentItem
          v-for="commentId of story.kids"
          :key="commentId"
          :commentId="commentId" />
      </ul>

      <template #fallback>
        <h2>LOADING...</h2>
      </template>
    </Suspense>
  </template>
  <h1 v-else>LOADING...</h1>
</template>

<script setup>
import useGetStory from '../composables/useGetStory.js';
import CommentItem from '../components/CommentItem.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const props = defineProps({
  id: { type: Number, required: true },
});

const story = ref(null);
useGetStory(story, props.id);

function refresh() {
  useGetStory(story, props.id);
}
</script>
