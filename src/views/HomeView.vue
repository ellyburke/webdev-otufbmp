<script setup>
import ListOfPostings from '../components/ListOfPostings.vue'
import { ref, computed, onMounted } from 'vue'
import { PostsService } from '../services/PostsService.ts'
import Sidebar from '../components/Sidebar.vue'

const allPosts = ref([])
const favouritePosts = ref([])
const postsService = new PostsService()
const showFavourites = ref(false)
const selectedCategory = ref(null)

const posts = computed(() => {
  const source = showFavourites.value ? favouritePosts.value : allPosts.value
  if (!selectedCategory.value) return source
  return source.filter(post => post.category === selectedCategory.value)
})

function getFavourites() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

  if (!showFavourites.value) {
    // About to show favourites — fetch them first, then flip the toggle
    if (!currentUser) {
      alert('Please log in to view favourites.')
      return
    }

    postsService
      .getFavouritePosts(currentUser.id)
      .then((data) => {
        favouritePosts.value = data
        showFavourites.value = true
      })
      .catch((error) => {
        console.error('Error loading favourite posts:', error)
      })
  } else {
    // Hide favourites — go back to all posts
    showFavourites.value = false
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
    <main class="home-content">
      <ListOfPostings :posts="posts" />
    </main>
  </div>
</template>

<style scoped>
.home-content {
  width: 100%;
  padding: 2rem;
}

.button {
  margin-bottom: 20px;
}
</style>