<template>
  <li v-if="isValid">
    <q-item :to="{ name: 'story', params: { id: story.id } }">
      <q-item-section>
        <q-item-label class="text-subtitle1">
          {{ story.title }}
        </q-item-label>

        <q-item-label caption>
          posted by {{ story.by }} {{ dayjs.unix(story.time).fromNow() }}
        </q-item-label>

        <q-item-label class="q-gutter-sm">
          <q-badge
            class="q-py-xs"
            color="red"
            rounded>
            Score: {{ story.score }}
            <q-icon
              name="thumb_up"
              class="q-ml-xs" />
          </q-badge>

          <q-badge
            class="q-py-xs"
            color="blue"
            rounded>
            Comments: {{ story.descendants }}
            <q-icon
              name="comment"
              class="q-ml-xs" />
          </q-badge>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator inset />
  </li>
</template>

<script setup>
import { computed, toRef, inject } from 'vue';

const dayjs = inject('dayjs');

const props = defineProps({
  story: Object,
});

const story = toRef(props, 'story');

const isValid = computed(() => !story.value.deleted && !story.value.dead);
</script>
