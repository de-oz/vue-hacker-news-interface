<template>
  <q-item
    v-if="isValid"
    :to="{ name: 'story', params: { id: story.id } }">
    <q-item-section>
      <q-item-label>
        {{ story.title }}
      </q-item-label>
      <q-item-label>
        Author: {{ story.by }} | Comments: {{ story.descendants }} | Time:
        {{ new Date(story.time).toLocaleTimeString() }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { computed, toRef } from 'vue';

const props = defineProps({
  story: Object,
});

const story = toRef(props, 'story');

const isValid = computed(() => !story.value.deleted && !story.value.dead);
</script>
