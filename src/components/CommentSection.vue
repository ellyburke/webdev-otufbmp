<script setup>
import { onMounted, ref, watch } from 'vue'
import CommentInput from './CommentInput.vue'

const props = defineProps({
  postId: Number,
})

const comments = ref([])

const loadComments = async () => {
  if (!props.postId) return

  const response = await fetch(`http://localhost:3000/items?id=${props.postId}`)
  const data = await response.json()
  comments.value = data.comments || []
}

onMounted(() => {
  loadComments()
})

watch(
  () => props.postId,
  () => {
    loadComments()
  },
)

const handleNewComment = () => {
  loadComments()
}
</script>

<template>
  <div class="card">
    <p v-for="comment in comments" :key="comment.id">
      {{ comment.user }}: {{ comment.text }}
    </p>
  </div>

  <CommentInput
    v-if="postId"
    :itemId="postId"
    @commentAdded="handleNewComment"
  />
</template>