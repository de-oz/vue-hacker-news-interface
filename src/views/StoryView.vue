<template>
  <template v-if="story">
    <div class="q-ma-md">
      <h1 class="text-weight-bold q-mt-md text-h5">
        {{ story.title }}
      </h1>

      <div class="q-my-sm">
        <q-btn
          :to="{ name: 'main' }"
          icon="home"
          label="Back to Main"
          padding="xs md"
          color="primary"
          dense
          rounded
          no-caps
          no-wrap />

        <q-btn
          :href="story.url"
          target="_blank"
          icon="link"
          label="Go to URL"
          padding="xs md"
          class="q-ml-sm"
          color="positive"
          dense
          rounded
          no-caps
          no-wrap />
      </div>

      <q-chip color="secondary">
        <q-avatar
          icon="thumb_up"
          size="md"
          color="deep-orange"
          text-color="white" />
        Score: {{ story.score }}
      </q-chip>

      <q-chip color="secondary">
        <q-avatar
          icon="person"
          size="md"
          color="deep-orange"
          text-color="white" />
        Author: {{ story.by }}
      </q-chip>

      <q-chip color="secondary">
        <q-avatar
          icon="calendar_month"
          size="md"
          color="deep-orange"
          text-color="white" />
        Date: {{ dayjs.unix(story.time).format('DD/MM/YYYY HH:mm') }} ({{
          dayjs.unix(story.time).fromNow()
        }})
      </q-chip>
    </div>

    <q-separator spaced="sm" />

    <div class="relative-position">
      <q-toolbar class="q-pl-lg">
        <q-toolbar-title
          class="text-h6"
          shrink>
          <q-icon
            color="primary"
            size="sm"
            name="forum" />
          Comments: {{ story.descendants }}
        </q-toolbar-title>

        <q-btn
          color="deep-orange"
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
          class="q-pl-sm q-gutter-y-xs"
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
            <q-spinner-tail color="positive" />
          </q-inner-loading>
        </template>
      </Suspense>
    </div>
  </template>
</template>

<script setup>
import { ref, watchEffect, inject } from 'vue';
import { useQuasar } from 'quasar';
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

const $q = useQuasar();
$q.loading.setDefaults({ message: 'Loading the story...' });

watchEffect(() => (story.value ? $q.loading.hide() : $q.loading.show()));
</script>

<style lang="scss" scoped>
.q-inner-loading {
  background-color: transparent;
  font-size: 100px;
  height: 300px;
}
</style>
