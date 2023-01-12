<template>
  <q-layout view="lHh lpr lFf">
    <q-header reveal>
      <q-toolbar class="glossy">
        <q-avatar rounded>
          <img
            src="./assets/Y_Combinator_logo.svg"
            alt="Y Combinator Logo" />
        </q-avatar>

        <q-toolbar-title class="text-h6">Hacker News Interface</q-toolbar-title>

        <div>
          <q-toggle
            v-model="theme"
            label="Theme"
            checked-icon="dark_mode"
            unchecked-icon="light_mode"
            size="45px"
            color="dark" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <RouterView />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useQuasar, setCssVar } from 'quasar';

const $q = useQuasar();
const theme = ref(false);

watchEffect(() => {
  $q.dark.set(theme.value);
  const color = theme.value ? '#FF5733' : '#283350';
  setCssVar('accent', color);
});
</script>

<style lang="scss">
* {
  transition: background-color 0.3s;
}

body {
  background-color: #f8eee7;
}

.q-page {
  margin: 12px 32px;
}

div > p {
  margin: 8px 0 0 0;
}

pre {
  white-space: pre-wrap;
  margin: 8px 0;
}

.loading {
  [class*='spinner'] {
    width: 100px;
    height: 100px;
    color: $warning;
  }

  [class*='backdrop'] {
    background-color: $info;
  }

  [class*='message'] {
    font-weight: bold;
    font-style: italic;
    margin-top: 20px;
  }
}

.body--light [class*='message'] {
  color: $primary;
}
</style>
