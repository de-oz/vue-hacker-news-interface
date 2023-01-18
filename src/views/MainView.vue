<template>
  <div class="row justify-center">
    <q-btn-toggle
      v-model="category"
      :padding="$q.screen.gt.xs ? '6px lg' : '6px md'"
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

  <div class="settings">
    <q-btn-dropdown
      :label="`Show: ${listLength}`"
      icon="list"
      auto-close
      no-wrap
      no-caps
      :ripple="false">
      <q-list separator>
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
      no-wrap
      no-caps
      :ripple="false">
      <q-list separator>
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
      icon="refresh"
      no-caps
      no-wrap
      @click="refresh">
      <span class="gt-xs q-ml-xs">Refresh</span>
    </q-btn>
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

watchEffect(() => (isLoading.value ? $q.loading.show() : $q.loading.hide()));

function refresh() {
  updateNews(isLoading);
}
</script>

<style lang="scss">
.settings {
  margin: 16px 0;

  .q-btn:not(:first-child) {
    margin-left: 16px;
  }

  .q-icon:first-child:not(:only-of-type) {
    margin-right: 6px;
  }

  .q-icon:last-child {
    margin-left: 6px;
  }
}

.settings .q-btn,
.q-menu .q-item {
  min-height: 0;
  padding: 4px 6px;
  text-align: center;
  color: $dark;
  background-color: $secondary;
}

@media (max-width: 600px) {
  ol {
    padding-left: 25px;

    .q-item {
      padding: 8px;
    }
  }

  .settings {
    display: flex;
    justify-content: center;

    .q-btn:not(:first-child) {
      margin-left: 8px;
    }
  }

  .settings .q-btn,
  .q-menu .q-item {
    padding: 4px 4px;
    font-size: 13px;
  }
}

@media (max-width: 400px) {
  .settings .q-btn:not(:first-child) {
    margin-left: 4px;
  }

  .settings .q-btn,
  .q-menu .q-item {
    font-size: 12px;
  }
}
</style>
