<template>
  <template v-if="story">
    <q-banner inline-actions>
      <h1 class="text-h4">
        {{ story.title }}
      </h1>
      <a
        :href="story.url"
        target="_blank"
        rel="noreferrer">
        {{ story.url }}
      </a>
      <div>
        Author: <span>{{ story.by }}</span>
      </div>
      <div>Date: {{ new Date(story.time * 1000).toLocaleString() }}</div>

      <template #action>
        <q-btn
          rounded
          glossy
          no-caps
          icon="home"
          label="Back to Main"
          color="indigo-8"
          :to="{ name: 'main' }" />
      </template>
    </q-banner>

    <q-toolbar class="q-pl-md">
      <q-toolbar-title shrink>
        Comments: {{ story.descendants }}
      </q-toolbar-title>

      <q-btn
        color="deep-orange-8"
        glossy
        no-caps
        dense
        icon="refresh"
        @click="refresh" />
    </q-toolbar>

    <Suspense timeout="0">
      <q-list
        tag="ul"
        separator
        :key="story.descendants">
        <CommentItem
          v-for="commentId of story.kids"
          :key="commentId"
          :commentId="commentId" />
      </q-list>

      <template #fallback>
        <h2>LOADING...</h2>
      </template>
    </Suspense>
  </template>

  <h1 v-else>LOADING...</h1>
</template>

<script setup>
import { ref } from 'vue';
import CommentItem from '../components/CommentItem.vue';
import { useGetStory } from '../composables/useGetStory.js';
import { useNewsStore } from '../stores/useNewsStore.js';

const props = defineProps({
  id: { type: Number, required: true },
});

const { news } = useNewsStore();

const story = ref(null);

if (news) {
  story.value = news.find((item) => item.id === props.id);
} else {
  useGetStory(props.id, story);
}

function refresh() {
  useGetStory(props.id, story);
}
</script>
