<template>
  <div class="row justify-center q-my-sm">
    <q-btn-toggle
      v-model="newsCategory"
      glossy
      push
      no-caps
      toggle-color="accent"
      :options="[
        { label: 'Top', value: 'top', icon: 'highlight' },
        { label: 'New', value: 'new', icon: 'new_releases' },
        { label: 'Best', value: 'best', icon: 'star' },
      ]" />
  </div>

  <div class="q-mx-lg q-gutter-xs">
    <q-btn-dropdown
      auto-close
      glossy
      dense
      no-caps
      color="secondary"
      icon="list"
      :label="`Show: ${listLength}`">
      <q-list>
        <q-item
          v-for="amount of [25, 50, 100]"
          :key="amount"
          clickable
          @click="listLength = amount">
          <q-item-section>{{ amount }} items</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn-dropdown
      auto-close
      glossy
      dense
      no-caps
      color="secondary"
      icon="autorenew"
      :label="`Auto refresh: ${intervalDelay}s`">
      <q-list>
        <q-item
          v-for="number of [15, 30, 60]"
          :key="number"
          clickable
          @click="intervalDelay = number">
          <q-item-section>{{ number }} seconds</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn
      glossy
      dense
      no-caps
      color="secondary"
      icon="refresh"
      label="Refresh"
      @click="updateNews(newsCategory, intervalDelay, listLength)">
    </q-btn>
  </div>

  <q-list
    v-if="news"
    class="q-ma-md"
    tag="ol">
    <StoryItem
      v-for="story of news"
      :story="story"
      :key="story.id" />
  </q-list>
</template>

<script setup>
import { ref, watchEffect, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { useNewsStore } from '../stores/useNewsStore.js';
import StoryItem from '../components/StoryItem.vue';

const store = useNewsStore();
const { news, intervalId, isLoading } = storeToRefs(store);
const { updateNews } = store;

const newsCategory = ref('top');
const intervalDelay = ref(15);
const listLength = ref(25);

watchEffect(() =>
  updateNews(newsCategory.value, intervalDelay.value, listLength.value)
);

onUnmounted(() => {
  news.value = null;
  clearInterval(intervalId.value);
});

const $q = useQuasar();

watchEffect(() => (isLoading.value ? $q.loading.show() : $q.loading.hide()));
</script>

<style lang="scss">
.q-list .q-item {
  min-height: unset;
}
</style>
