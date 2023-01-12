<template>
  <template v-if="story">
    <div>
      <h1 class="text-weight-bold q-mt-md text-h6">
        {{ story.title }}
      </h1>

      <div class="q-my-sm q-gutter-x-sm">
        <q-btn
          :to="{ name: 'main' }"
          label="Back to Main"
          icon="home"
          padding="xs md"
          color="accent"
          dense
          rounded
          no-caps
          no-wrap />

        <q-btn
          :href="story.url"
          target="_blank"
          label="Go to URL"
          icon="link"
          padding="xs md"
          color="teal"
          dense
          rounded
          no-caps
          no-wrap />
      </div>

      <q-chip
        v-for="chip of [
          { icon: 'thumb_up', label: `Score: ${story.score}` },
          { icon: 'person', label: `Author: ${story.by}` },
          {
            icon: 'calendar_month',
            label: `Date: ${dayjs
              .unix(story.time)
              .format('DD/MM/YYYY HH:mm')} (${dayjs
              .unix(story.time)
              .fromNow()})`,
          },
        ]"
        :key="chip.icon"
        text-color="black"
        color="secondary">
        <q-avatar
          :icon="chip.icon"
          size="md"
          color="red-7"
          text-color="white" />
        {{ chip.label }}
      </q-chip>
    </div>

    <q-separator spaced="md" />

    <div class="relative-position">
      <q-toolbar>
        <q-toolbar-title
          style="font-size: 18px"
          shrink>
          <q-icon
            name="forum"
            color="accent"
            size="sm" />
          Comments: {{ story.descendants }}
        </q-toolbar-title>

        <q-btn
          icon="refresh"
          color="light-blue-8"
          round
          glossy
          no-caps
          dense
          @click="refresh" />
      </q-toolbar>

      <Suspense timeout="0">
        <q-list
          :key="() => (commentsToggle = !commentsToggle)"
          tag="ul"
          separator>
          <CommentItem
            v-for="commentId of story.kids"
            :key="commentId"
            :commentId="commentId"
            collapse />
        </q-list>

        <template #fallback>
          <q-inner-loading :showing="true">
            <q-spinner-tail
              size="100px"
              color="warning" />
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
  height: 300px;
}

ul {
  padding: 0;
}

.q-chip {
  margin: 8px 6px 8px 4px;
}
</style>
