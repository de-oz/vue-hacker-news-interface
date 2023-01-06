<template>
  <template v-if="story">
    <div class="q-mx-md q-my-md">
      <h1 class="text-weight-bold q-mt-md q-mb-sm text-h5">
        {{ story.title }}
      </h1>

      <div class="q-my-sm">
        <q-btn
          :to="{ name: 'main' }"
          icon="home"
          label="Main"
          padding="xs md"
          color="indigo"
          dense
          outline
          rounded
          no-caps
          no-wrap />

        <q-btn
          :href="story.url"
          target="_blank"
          icon="link"
          label="URL"
          class="q-ml-sm"
          padding="xs md"
          color="red"
          no-wrap
          rounded
          dense
          outline
          no-caps />
      </div>

      <q-chip>
        <q-avatar
          icon="thumb_up"
          size="md"
          color="red"
          text-color="white" />
        Score: {{ story.score }}
      </q-chip>

      <q-chip>
        <q-avatar
          icon="person"
          size="md"
          color="red"
          text-color="white" />
        Author: {{ story.by }}
      </q-chip>

      <q-chip>
        <q-avatar
          icon="calendar_month"
          size="md"
          color="red"
          text-color="white" />
        Date: {{ dayjs.unix(story.time).format('DD/MM/YYYY HH:mm') }} ({{
          dayjs.unix(story.time).fromNow()
        }})
      </q-chip>
    </div>

    <q-separator></q-separator>

    <div class="comment-section">
      <q-toolbar class="q-pl-lg">
        <q-toolbar-title
          class="text-h6"
          shrink>
          <q-icon
            color="blue"
            size="sm"
            name="forum" />
          Comments: {{ story.descendants }}
        </q-toolbar-title>

        <q-btn
          color="accent"
          round
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
          :key="() => (commentsToggle = !commentsToggle)">
          <CommentItem
            v-for="commentId of story.kids"
            :key="commentId"
            :commentId="commentId"
            collapse />
        </q-list>

        <template #fallback>
          <q-inner-loading :showing="true">
            <q-spinner-oval
              size="5em"
              color="red" />
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
import { ref, inject } from 'vue';
import CommentItem from '../components/CommentItem.vue';
import { useGetStory } from '../composables/useGetStory.js';
import { useNewsStore } from '../stores/useNewsStore.js';

const dayjs = inject('dayjs');

const props = defineProps({
  id: { type: Number, required: true },
});

const { news } = useNewsStore();
const story = ref(null);
let commentsToggle = false;

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
