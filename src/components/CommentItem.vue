<template>
  <q-item
    v-if="isValid"
    tag="li">
    <q-item-section>
      <q-item-label>
        by {{ comment.by }}; posted:
        {{ new Date(comment.time * 1000).toLocaleString() }}
      </q-item-label>

      <div
        v-html="comment.text"
        class="q-item__label" />

      <template v-if="comment.kids">
        <q-item-label>
          <q-btn
            glossy
            ripple
            no-caps
            dense
            :icon="isExpanded ? 'expand_less' : 'expand_more'"
            @click="toggleSubcomments">
            {{ isExpanded ? 'Collapse' : 'Expand' }}
          </q-btn>
        </q-item-label>

        <q-list
          v-if="isExpanded"
          tag="ul"
          separator>
          <Suspense
            v-if="isExpansionInitiator"
            timeout="0">
            <CommentItem
              v-for="commentId of comment.kids"
              :key="commentId"
              :commentId="commentId" />

            <template #fallback>
              <div class="comment-section">
                <q-inner-loading :showing="true">
                  <q-spinner-bars
                    size="5em"
                    color="amber" />
                </q-inner-loading>
              </div>
            </template>
          </Suspense>

          <CommentItem
            v-else
            v-for="commentId of comment.kids"
            :key="commentId"
            :commentId="commentId" />
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
  collapse: Boolean,
});

const isExpanded = ref(!props.collapse); // set to false on a root comment and to true on nested comments
const isExpansionInitiator = ref(false);

const comment = ref(null);
const isValid = computed(() => !comment.value.deleted && !comment.value.dead);

function toggleSubcomments() {
  isExpanded.value = !isExpanded.value;
  isExpansionInitiator.value = isExpanded.value; // set to true only on a comment whose expand button was clicked
}

await useGetStory(props.commentId, comment);
</script>

<style lang="scss" scoped>
.comment-section {
  position: relative;
  min-height: 10vh;
}
</style>
