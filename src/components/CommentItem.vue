<template>
  <q-item
    v-if="isValid"
    tag="li">
    <q-item-section>
      <q-item-label>
        by {{ comment.by }}; posted:
        {{ new Date(comment.time * 1000).toLocaleString() }}
      </q-item-label>

      <q-item-label v-html="comment.text" />

      <template v-if="comment.kids">
        <q-item-label>
          <q-btn
            glossy
            ripple
            no-caps
            dense
            :icon="isExpanded ? 'expand_less' : 'expand_more'"
            @click="isExpanded = !isExpanded">
            {{ isExpanded ? 'Collapse' : 'Expand' }}
          </q-btn>
        </q-item-label>

        <q-list
          v-if="isExpanded"
          tag="ul"
          separator>
          <Suspense
            v-if="!expand"
            timeout="0">
            <CommentItem
              v-for="commentId of comment.kids"
              :key="commentId"
              :commentId="commentId"
              expand />

            <template #fallback>
              <h1>LOADING...</h1>
            </template>
          </Suspense>

          <CommentItem
            v-else
            v-for="commentId of comment.kids"
            :key="commentId"
            :commentId="commentId"
            expand />
        </q-list>
      </template>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGetStory } from '../composables/useGetStory.js';

const props = defineProps({
  commentId: Number,
  expand: Boolean, // default is false, nested comments are collapsed by default
});

const isExpanded = ref(props.expand);

const comment = ref(null);
const isValid = computed(() => !comment.value.deleted && !comment.value.dead);

await useGetStory(props.commentId, comment);
</script>
