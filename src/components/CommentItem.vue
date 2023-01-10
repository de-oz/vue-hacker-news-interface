<template>
  <q-item
    v-if="isValid"
    tag="li">
    <q-item-section>
      <q-item-label>
        <q-icon
          color="primary"
          size="md"
          name="account_circle" />
        <span class="text-italic">
          <span class="author">{{ comment.by }}</span>
          {{ dayjs.unix(comment.time).fromNow() }}
        </span>
      </q-item-label>

      <div
        v-html="comment.text"
        class="comment-text" />

      <template v-if="hasSubcomments">
        <q-btn
          :label="isExpanded ? 'Collapse' : 'Expand'"
          :icon="isExpanded ? 'expand_less' : 'expand_more'"
          :ripple="false"
          class="self-start text-weight-bold q-mb-sm"
          size="12px"
          padding="2px 10px 2px 6px"
          color="primary"
          dense
          glossy
          rounded
          unelevated
          no-caps
          no-wrap
          @click="toggleSubcomments" />

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
              <q-inner-loading :showing="true">
                <q-spinner-gears color="positive" />
              </q-inner-loading>
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
.q-inner-loading {
  position: relative;
  background-color: transparent;
  font-size: 70px;
  height: 83.5px;
}

.comment-text {
  line-height: 1.25;
  padding: 12px 0 8px;
  overflow-wrap: anywhere;
}

.author {
  font-weight: bold;
  margin-left: 4px;
}

li {
  padding: 8px 0 0 12px;
}
</style>
