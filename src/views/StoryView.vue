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

    <div class="comment-section">
      <q-toolbar class="q-pl-md">
        <q-toolbar-title shrink>
          Comments: {{ story.descendants }}
        </q-toolbar-title>

        <q-btn
          color="accent"
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
            :commentId="commentId"
            collapse />
        </q-list>

        <template #fallback>
          <q-inner-loading :showing="true">
            <q-spinner-ball
              size="5em"
              color="amber" />
          </q-inner-loading>
        </template>
      </Suspense>
    </div>
  </template>

  <q-inner-loading :showing="!story">
    <q-spinner-gears
      size="5em"
      color="accent" />
    <div class="q-pa-md">Fetching the story...</div>
  </q-inner-loading>
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

<style lang="scss" scoped>
.comment-section {
  position: relative;
  min-height: 50vh;
}
</style>
