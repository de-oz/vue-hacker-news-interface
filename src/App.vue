<template>
  <q-layout view="lHh lpr lFf">
    <q-header
      reveal
      elevated
      bordered>
      <q-toolbar class="glossy">
        <q-avatar
          class="shadow-3"
          rounded>
          <img
            src="./assets/Y_Combinator_logo.svg"
            alt="Y Combinator Logo" />
        </q-avatar>

        <q-toolbar-title class="text-h5">Hacker News Interface</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <RouterView />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
body {
  background-color: $info;
}

div > p:last-child {
  margin: 0;
}

.q-page {
  margin: 8px 32px;
}
</style>
