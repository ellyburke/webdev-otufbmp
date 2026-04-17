<script setup>
import ListOfPostings from '../components/ListOfPostings.vue'
import { ref, computed, onMounted } from 'vue'
import { PostsService } from '../services/PostsService.ts'
import Sidebar from '../components/Sidebar.vue'

const allPosts = ref([])
const postsService = new PostsService()
let showFavourites = ref(false)
const selectedCategory = ref(null)

// Filter posts by selected category (or show all if none selected)
const posts = computed(() => {
  if (!selectedCategory.value) return allPosts.value
  return allPosts.value.filter(post => post.category === selectedCategory.value)
})

function getFavourites() {
  showFavourites.value = !showFavourites.value

  if (showFavourites.value) {
    // postsService.getFavouritePosts(1).then(...)
  } else {
    postsService
      .getAllPosts()
      .then((data) => {
        allPosts.value = data
      })
      .catch((error) => {
        console.error('Error loading posts:', error)
      })
  }
}

function filterByCategory(category) {
  selectedCategory.value = category
}

onMounted(() => {
  postsService
    .getAllPosts()
    .then((data) => {
      allPosts.value = data
    })
    .catch((error) => {
      console.error('Error loading posts:', error)
    })
})
</script>

<template>
  <div class="is-flex">
    <Sidebar
      @toggle-favourites="getFavourites"
      @filter-category="filterByCategory"
    />
    <main class="container">
      <ListOfPostings :posts="posts" />
    </main>
  </div>
</template>

<style>
.container {
  padding: 2rem;
}
</style>