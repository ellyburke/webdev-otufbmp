<script setup>
import PostingCreate from '../components/PostingCreate.vue'
import ListOfPostings from '../components/ListOfPostings.vue'
import { ref, onMounted } from 'vue'
import { PostsService } from '../services/PostsService.ts'

const posts = ref([])
const postsService = new PostsService()
let showFavourites = ref(false)

// Filter to show only favourite posts vs all posts
function getFavourites() {
  showFavourites.value = !showFavourites.value
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

  if (showFavourites.value) {
    if (!currentUser) {
      alert('Please log in to view favourites.')
      showFavourites.value = false
      return
    }

    postsService
      .getFavouritePosts(currentUser.id)
      .then((data) => {
        posts.value = data
      })
      .catch((error) => {
        console.error('Error loading favourite posts:', error)
      })
  } else {
    postsService
      .getAllPosts()
      .then((data) => {
        posts.value = data
      })
      .catch((error) => {
        console.error('Error loading posts:', error)
      })
  }
}

onMounted(() => {
  postsService
    .getAllPosts()
    .then((data) => {
      posts.value = data
    })
    .catch((error) => {
      console.error('Error loading posts:', error)
    })
})
</script>

<template>
  <main class="container">
    <button class="button is-primary" @click="getFavourites">
      {{ showFavourites ? 'Hide Favourites' : 'Show Favourites' }}
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
      </svg>
    </button>
    <ListOfPostings :posts="posts" />
  </main>
</template>
