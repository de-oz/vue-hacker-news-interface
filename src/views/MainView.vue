<template>
  <div class="row justify-center q-my-sm">
    <q-btn-toggle
      v-model="category"
      @click="refresh"
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
          clickable
          @click="listLength = 25">
          <q-item-section>25 items</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="listLength = 50">
          <q-item-section>50 items</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="listLength = 100">
          <q-item-section>100 items</q-item-section>
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
      :label="`Auto refresh: ${autoRefresh}s`">
      <q-list>
        <q-item
          clickable
          @click="autoRefresh = 15">
          <q-item-section>15 seconds</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="autoRefresh = 30">
          <q-item-section>30 seconds</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="autoRefresh = 60">
          <q-item-section>60 seconds</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn
      glossy
      dense
      no-caps
      color="info"
      icon="refresh"
      label="Refresh"
      @click="refresh">
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

  <h1 v-else>LOADING...</h1>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import StoryItem from '../components/StoryItem.vue';
import { useNewsStore } from '../stores/useNewsStore.js';

const store = useNewsStore();
const { news, intervalId } = storeToRefs(store);
const { updateNews } = store;

const category = ref('top');
const autoRefresh = ref(15);
const listLength = ref(25);

updateNews(category);
onUnmounted(() => clearInterval(intervalId.value));

function refresh() {
  clearInterval(intervalId.value);
  updateNews(category);
}
</script>

<style lang="scss">
.q-list .q-item {
  min-height: unset;
}
</style>
