<template>
  <h2>Story Page</h2>
  <p>Story ID: {{ id }}</p>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const id = Number(route.params.id);
</script>
