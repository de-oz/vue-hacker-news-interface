<template>
  <q-layout view="lHh lpr lFf">
    <q-header
      reveal
      elevated
      bordered>
      <q-toolbar class="glossy">
        <q-avatar rounded>
          <img src="./assets/Y_Combinator_logo.svg" />
        </q-avatar>

        <q-toolbar-title>Hacker News Interface</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <RouterView />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
