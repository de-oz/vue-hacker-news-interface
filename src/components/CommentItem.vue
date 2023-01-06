<template>
  <q-item
    v-if="isValid"
    tag="li">
    <q-item-section>
      <q-item-label>
        <q-icon
          size="md"
          name="account_circle" />
        {{ comment.by }} {{ dayjs.unix(comment.time).fromNow() }} ({{
          dayjs.unix(comment.time).format('DD/MM/YYYY HH:mm')
        }})
      </q-item-label>

      <div
        v-html="comment.text"
        class="comment-text" />

      <template v-if="hasSubcomments">
        <q-item-label>
          <q-btn
            :label="isExpanded ? 'Collapse' : 'Expand'"
            :icon="isExpanded ? 'expand_less' : 'expand_more'"
            size="12px"
            padding="2px 8px"
            rounded
            ripple
            unelevated
            color="blue"
            glossy
            no-caps
            dense
            @click="toggleSubcomments" />
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
import { ref, computed, inject } from 'vue';
import { useGetStory } from '../composables/useGetStory.js';

const dayjs = inject('dayjs');

const props = defineProps({
  commentId: Number,
  collapse: Boolean,
});

const comment = ref(null);
const hasSubcomments = ref(false);
const isExpanded = ref(!props.collapse); // set to false on a root comment and to true on nested comments
const isExpansionInitiator = ref(false);

const isValid = computed(() => !comment.value.deleted && !comment.value.dead);

function toggleSubcomments() {
  isExpanded.value = !isExpanded.value;
  isExpansionInitiator.value = isExpanded.value; // set to true only on the comment whose expand button was clicked
}

await useGetStory(props.commentId, comment);

if (comment.value.kids) {
  for (const commentId of comment.value.kids) {
    const subcomment = await useGetStory(commentId);

    if (!subcomment.deleted && !subcomment.dead) {
      hasSubcomments.value = true; // set to true only if comment.kids exists and contains at least one valid comment
      break;
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-section {
  position: relative;
  min-height: 10vh;
}

.comment-text {
  line-height: 1.25;
  margin: 12px 0 6px;
}
</style>
