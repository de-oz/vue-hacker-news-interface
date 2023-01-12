<template>
  <div class="row justify-center">
    <q-btn-toggle
      v-model="category"
      size="15px"
      padding="6px lg"
      toggle-color="positive"
      color="orange-1"
      text-color="black"
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

  <div class="btn-group q-my-md q-gutter-x-md">
    <q-btn-dropdown
      :label="`Show: ${listLength}`"
      icon="list"
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
      dense
      no-caps
      no-wrap
      @click="refresh" />
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
const { news, category, listLength, intervalDelay, intervalId } =
  storeToRefs(store);
const { updateNews } = store;

const isLoading = ref(false);

watchEffect(() => updateNews(isLoading));

onUnmounted(() => clearInterval(intervalId.value));

const $q = useQuasar();
$q.loading.setDefaults({ message: 'Updating the news list...' });

watchEffect(() => (isLoading.value ? $q.loading.show() : $q.loading.hide()));

function refresh() {
  updateNews(isLoading);
}
</script>

<style lang="scss">
.btn-group .q-btn,
.q-menu .q-item {
  color: #000;
  background-color: $secondary;
  text-align: center;
  padding: 4px 8px;
}
</style>
