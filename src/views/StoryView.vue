<template>
  <h2>Story Page</h2>
  <p>Story ID: {{ id }}</p>
</template>

<script setup>
defineProps({
  id: { type: Number, required: true },
});
</script>
