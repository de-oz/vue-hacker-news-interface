<template>
  <q-tabs
    v-model="tab"
    class="q-mb-md"
    no-caps
    inline-label>
    <q-tab
      icon="star"
      name="best"
      label="Best" />
    <q-tab
      name="new"
      label="New"
      icon="new_releases" />
    <q-tab
      name="top"
      label="Top"
      icon="highlight" />

    <q-btn
      class="q-mx-md"
      flat
      no-caps
      icon="refresh"
      label="Refresh"
      @click="refresh">
    </q-btn>
    <q-btn-dropdown
      auto-close
      stretch
      flat
      no-caps
      icon="autorenew"
      :label="`Autorefresh ${auto}s`">
      <q-list>
        <q-item
          clickable
          @click="auto = 15">
          <q-item-section>15 seconds</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="auto = 30">
          <q-item-section>30 seconds</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="auto = 60">
          <q-item-section>60 seconds</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn-dropdown
      auto-close
      stretch
      flat
      no-caps
      icon="numbers"
      :label="`Show ${items}`">
      <q-list>
        <q-item
          clickable
          @click="items = 25">
          <q-item-section>25 items</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="items = 50">
          <q-item-section>50 items</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="items = 100">
          <q-item-section>100 items</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-tabs>

  <q-list
    v-if="news"
    separator
    tag="ul">
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

const tab = ref('top');
const auto = ref(30);
const items = ref(25);

updateNews();

onUnmounted(() => clearInterval(intervalId.value));

function refresh() {
  clearInterval(intervalId.value);
  updateNews();
}
</script>
