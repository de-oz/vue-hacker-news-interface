<template>
  <div class="row justify-center">
    <q-btn-toggle
      v-model="newsCategory"
      size="15px"
      padding="6px lg"
      toggle-color="accent"
      spread
      rounded
      glossy
      push
      no-wrap
      no-caps
      :ripple="false"
      :options="[
        { label: 'Top', value: 'top', icon: 'highlight' },
        { label: 'New', value: 'new', icon: 'new_releases' },
        { label: 'Best', value: 'best', icon: 'star' },
      ]" />
  </div>

  <div class="q-my-md q-gutter-x-md">
    <q-btn-dropdown
      :label="`Show: ${listLength}`"
      icon="list"
      padding="xs 6px"
      color="secondary"
      text-color="black"
      auto-close
      dense
      no-wrap
      no-caps
      :ripple="false">
      <q-list
        separator
        dense>
        <q-item
          v-for="value of [25, 50, 100]"
          :key="value"
          tag="li"
          clickable
          @click="listLength = value">
          <q-item-section>{{ value }} items</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn-dropdown
      :label="`Auto refresh: ${intervalDelay}s`"
      icon="autorenew"
      padding="xs 6px"
      color="secondary"
      text-color="black"
      auto-close
      dense
      no-wrap
      no-caps
      :ripple="false">
      <q-list
        separator
        dense>
        <q-item
          v-for="value of [15, 30, 60]"
          :key="value"
          tag="li"
          clickable
          @click="intervalDelay = value">
          <q-item-section>{{ value }} seconds</q-item-section>
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
      no-caps
      no-wrap
      @click="updateNews(newsCategory, intervalDelay, listLength)" />
  </div>

  <q-list
    v-if="news"
    tag="ol">
    <StoryItem
      v-for="story of news"
      :key="story.id"
      :story="story" />
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
const intervalDelay = ref(30);
const listLength = ref(50);

watchEffect(() =>
  updateNews(newsCategory.value, intervalDelay.value, listLength.value)
);

const $q = useQuasar();
$q.loading.setDefaults({ message: 'Updating the news list...' });

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
