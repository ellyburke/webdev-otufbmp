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

  if (showFavourites.value) {
    postsService
      .getFavouritePosts(1)
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
    </button>
    <ListOfPostings :posts="posts" />
  </main>
</template>
