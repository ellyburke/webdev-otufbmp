<script setup>
import { ref } from 'vue'

const emit = defineEmits(['toggleFavourites', 'filterCategory'])

const showFavourites = ref(false)
const selectedCategory = ref(null)

const categories = [
  "Electronics", "Clothing", "Home & Garden", "Sports & Outdoors",
  "Books & Media", "Toys & Games", "Health & Beauty",
  "Automotive", "Music & Instruments", "Rental Properties"
]

function getFavourites() {
  showFavourites.value = !showFavourites.value
  emit('toggleFavourites')
}

function selectCategory(category) {
  // Clicking the same category again deselects it
  if (selectedCategory.value === category) {
    selectedCategory.value = null
    emit('filterCategory', null)
  } else {
    selectedCategory.value = category
    emit('filterCategory', category)
  }
}
</script>

<template>
  <aside class="sidebar">
    <button class="button is-primary" @click="getFavourites">
      {{ showFavourites ? 'Hide Favourites' : 'Show Favourites' }}
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
      </svg>
    </button>

    <h1 class="title is-4">Filters</h1>

    <section>
      <div v-for="category in categories" :key="category">
        <p
          class="category block"
          :class="{ 'is-active': selectedCategory === category }"
          @click="selectCategory(category)"
        >
          {{ category }}
        </p>
        <span class="break"></span>
      </div>
    </section>
  </aside>
</template>

<style scoped>
.break {
  display: block;
  height: 0.2rem;
  border-radius: 999px;
  background-color: #d7d7d7;
  margin: 0;
}

.category {
  padding: 1rem;
  margin: 0;
  cursor: pointer;
}

.category:hover {
  background-color: #d7d7d7;
}

.category.is-active {
  background-color: #3273dc;
  color: white;
}

.sidebar {
  width: 250px;
  padding: 1rem;
  background-color: #e3e2e2;
}

.title {
  margin-bottom: 0 !important;
  margin-top: 1rem;
}
</style>