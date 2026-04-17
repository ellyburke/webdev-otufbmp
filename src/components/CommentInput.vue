<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  itemId: number
}>()

const emit = defineEmits(['commentAdded'])

const commentText = ref('')
const errorMessage = ref('')

async function submitComment() {
  errorMessage.value = ''

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

  if (!currentUser) {
    errorMessage.value = 'Please log in to comment.'
    return
  }

  if (!commentText.value.trim()) {
    errorMessage.value = 'Comment cannot be empty.'
    return
  }

  try {
    const response = await fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_id: props.itemId,
        user: currentUser.username,
        text: commentText.value.trim(),
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      errorMessage.value = data.error || 'Failed to post comment'
      return
    }

    commentText.value = ''
    emit('commentAdded', data)
  } catch (error) {
    console.error('Error posting comment:', error)
    errorMessage.value = 'Failed to post comment'
  }
}
</script>

<template>
  <div>
    <p v-if="errorMessage" class="has-text-danger mb-2">{{ errorMessage }}</p>

    <textarea
      v-model="commentText"
      class="textarea"
      placeholder="Write a comment..."
    ></textarea>

    <button class="button is-primary mt-2" @click="submitComment">
      Post Comment
    </button>
  </div>
</template>