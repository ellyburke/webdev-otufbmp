<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CommentSection from '@/components/CommentSection.vue'
import RatingSection from '@/components/RatingSection.vue'
import { PostsService } from '@/services/PostsService'

const postData = ref<any>(null)
const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
const postsService = new PostsService()
const isFavourited = ref(false)

onMounted(async () => {
  const post = history.state.post
  if (post) {
    postData.value = post
  }

  if (currentUser && postData.value?.id) {
    const favourites = await postsService.getFavouritePosts(currentUser.id)
    isFavourited.value = favourites.some((fav: any) => fav.id === postData.value.id)
  }
})

async function toggleFavourite() {
  if (!currentUser || !postData.value?.id) {
    alert('Please log in to favourite posts.')
    return
  }

  let result

  if (isFavourited.value) {
    result = await postsService.removeFavourite(currentUser.id, postData.value.id)
    if (result?.success) {
      isFavourited.value = false
    } else {
      alert(result?.error || 'Failed to remove favourite')
    }
  } else {
    result = await postsService.addFavourite(currentUser.id, postData.value.id)
    if (result?.success) {
      isFavourited.value = true
    } else {
      alert(result?.error || 'Failed to add favourite')
    }
  }
}

async function deletePost() {
  if (!currentUser || !postData.value?.id) return

  const confirmed = window.confirm('Are you sure you want to delete this post?')
  if (!confirmed) return

  const result = await postsService.deletePost(postData.value.id, currentUser.id)

  if (result?.success) {
    alert('Post deleted successfully.')
    window.location.href = '/'
  } else {
    alert(result?.error || 'Failed to delete post')
  }
}
</script>

<template>
  <div v-if="postData">
    <h1>{{ postData.name }}</h1>
    <p>{{ postData.description }}</p>
    <RatingSection :itemId="postData.id" />

    <img
      v-if="postData.image_url"
      :src="`http://localhost:3000${postData.image_url}`"
      alt="Image of listing item."
    />

    <div class="buttons mt-4">
      <button
        v-if="currentUser"
        class="button is-warning"
        @click="toggleFavourite"
      >
        {{ isFavourited ? 'Unfavourite' : 'Favourite' }}
      </button>

      <button
        v-if="currentUser && currentUser.id === postData.account_id"
        class="button is-danger"
        @click="deletePost"
      >
        Delete
      </button>
    </div>
  </div>

  <CommentSection :postId="postData?.id" />
</template>