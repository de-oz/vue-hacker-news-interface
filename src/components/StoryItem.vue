<template>
  <li v-if="isValid">
    <q-item :to="{ name: 'story', params: { id: story.id } }">
      <q-item-section>
        <q-item-label class="text-weight-bold text-subtitle1">
          {{ story.title }}
        </q-item-label>

        <q-item-label caption>
          posted by {{ story.by }} {{ dayjs.unix(story.time).fromNow() }}
        </q-item-label>

        <div class="q-mt-sm q-gutter-x-sm">
          <q-badge
            class="q-py-xs q-px-sm"
            color="red"
            rounded>
            Score: {{ story.score }}
            <q-icon
              name="thumb_up"
              class="q-ml-xs" />
          </q-badge>

          <q-badge
            class="q-py-xs q-px-sm"
            color="blue"
            rounded>
            Comments: {{ story.descendants }}
            <q-icon
              name="comment"
              class="q-ml-xs" />
          </q-badge>
        </div>
      </q-item-section>
    </q-item>

    <q-separator spaced="sm" />
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
