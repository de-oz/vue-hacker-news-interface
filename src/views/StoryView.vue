<template>
  <template v-if="story">
    <div class="q-mx-md q-my-md">
      <q-btn
        icon="home"
        label="Back to Main"
        padding="xs sm"
        color="indigo"
        outline
        rounded
        no-caps
        no-wrap
        :to="{ name: 'main' }" />

      <h1 class="text-weight-bold q-mt-md q-mb-sm text-h5">
        {{ story.title }}
        <q-btn
          :href="story.url"
          target="_blank"
          icon="link"
          label="Go to URL"
          class="q-ml-sm"
          padding="2px sm"
          color="red"
          no-wrap
          rounded
          dense
          outline
          no-caps />
      </h1>

      <q-chip>
        <q-avatar
          icon="thumb_up"
          color="red"
          text-color="white" />
        Score: {{ story.score }}
      </q-chip>

      <q-chip>
        <q-avatar
          icon="person"
          color="red"
          text-color="white" />
        Author: {{ story.by }}
      </q-chip>

      <div>
        <q-chip>
          <q-avatar
            icon="calendar_month"
            color="red"
            text-color="white" />
          Date: {{ dayjs.unix(story.time).format('DD/MM/YYYY HH:mm') }} ({{
            dayjs.unix(story.time).fromNow()
          }})
        </q-chip>
      </div>
    </div>

    <q-separator></q-separator>

    <div class="comment-section">
      <q-toolbar class="q-pl-md">
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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

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
