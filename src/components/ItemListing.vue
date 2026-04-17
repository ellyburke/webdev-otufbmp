<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RatingSection from './RatingSection.vue'
import { PostsService } from '../services/PostsService'

const props = defineProps({
  post: Object,
})

const postsService = new PostsService()
const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
const isFavourited = ref(false)

async function checkIfFavourited() {
  if (!currentUser || !props.post?.id) return

  const favourites = await postsService.getFavouritePosts(currentUser.id)
  isFavourited.value = favourites.some((fav: any) => fav.id === props.post.id)
}

async function toggleFavourite() {
  if (!currentUser || !props.post?.id) {
    alert('Please log in to favourite posts.')
    return
  }

  let result

  if (isFavourited.value) {
    result = await postsService.removeFavourite(currentUser.id, props.post.id)
    if (result?.success) {
      isFavourited.value = false
    } else {
      alert(result?.error || 'Failed to remove favourite')
    }
  } else {
    result = await postsService.addFavourite(currentUser.id, props.post.id)
    if (result?.success) {
      isFavourited.value = true
    } else {
      alert(result?.error || 'Failed to add favourite')
    }
  }
}

async function deletePost() {
  if (!currentUser || !props.post?.id) return

  const confirmed = window.confirm('Are you sure you want to delete this post?')
  if (!confirmed) return

  const result = await postsService.deletePost(props.post.id, currentUser.id)

  if (result?.success) {
    window.location.reload()
  } else {
    alert(result?.error || 'Failed to delete post')
  }
}

onMounted(() => {
  checkIfFavourited()
})
</script>

<template>
  <div class="post-box">
    <RouterLink :to="{ path: `/item/${post.id}`, state: { post: { ...post } } }" class="title">
      {{ post.name }}
    </RouterLink>

    <div v-if="post.image_url" class="image-box">
      <img :src="`http://localhost:3000${post.image_url}`" alt="Image from Post" />
    </div>

    <p class="price">${{ post.price }}</p>
    <RatingSection :itemId="post.id" compact />
    <p class="description">{{ post.description }}</p>

    <button
      v-if="currentUser"
      class="button is-warning is-small mt-3"
      @click="toggleFavourite"
    >
      {{ isFavourited ? 'Unfavourite' : 'Favourite' }}
    </button>

    <button
      v-if="currentUser && currentUser.id === post.account_id"
      class="button is-danger is-small mt-3"
      @click="deletePost"
    >
      Delete
    </button>
  </div>
</template>