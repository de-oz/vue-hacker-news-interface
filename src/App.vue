<template>
  <q-layout view="lHh lpr lFf">
    <q-header
      reveal
      elevated
      bordered>
      <q-toolbar class="glossy">
        <q-avatar
          class="shadow-5"
          rounded>
          <img
            src="./assets/Y_Combinator_logo.svg"
            alt="Y Combinator Logo" />
        </q-avatar>

        <q-toolbar-title class="text-h5">Hacker News Interface</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-px-md">
        <RouterView />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
* > p:last-child {
  margin: 0;
}
</style>
