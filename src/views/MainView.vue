<template>
  <div class="row justify-center q-my-sm">
    <q-btn-toggle
      v-model="newsCategory"
      size="16px"
      padding="6px lg"
      toggle-color="accent"
      spread
      no-wrap
      rounded
      glossy
      push
      no-caps
      :ripple="false"
      :options="[
        { label: 'Top', value: 'top', icon: 'highlight' },
        { label: 'New', value: 'new', icon: 'new_releases' },
        { label: 'Best', value: 'best', icon: 'star' },
      ]" />
  </div>

  <div class="q-mx-lg q-gutter-sm">
    <q-btn-dropdown
      :label="`Show: ${listLength}`"
      icon="list"
      padding="xs sm"
      color="secondary"
      text-color="black"
      auto-close
      dense
      glossy
      no-wrap
      no-caps>
      <q-list separator>
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
      :label="`Auto refresh: ${intervalDelay}s`"
      icon="autorenew"
      padding="xs sm"
      color="secondary"
      text-color="black"
      auto-close
      dense
      glossy
      no-wrap
      no-caps>
      <q-list separator>
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
      label="Refresh"
      icon="refresh"
      padding="xs sm"
      color="secondary"
      text-color="black"
      dense
      glossy
      no-caps
      @click="updateNews(newsCategory, intervalDelay, listLength)" />
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

const $q = useQuasar();

watchEffect(() => (isLoading.value ? $q.loading.show() : $q.loading.hide()));

onUnmounted(() => {
  news.value = null;
  clearInterval(intervalId.value);
});
</script>

<style lang="scss">
.q-menu .q-item {
  background-color: $secondary;
  min-height: unset;
}
</style>
