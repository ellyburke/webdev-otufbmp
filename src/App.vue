<script setup>
import { ref } from 'vue'
import CommentInput from './components/CommentInput.vue'
import CommentSection from './components/CommentSection.vue'
import Sidebar from './components/Sidebar.vue'
import HomeView from './views/HomeView.vue'

// To filer for favourites
let showFavourites = ref(false)
const getFavourites = () => {
  console.log('Getting favourite posts...')
  showFavourites.value = !showFavourites.value
}
</script>

<template>
  <div class="">
    <nav class="navbar is-dark is-flex is-justify-content-space-between">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item">OT Marketplace</RouterLink>
        <RouterLink to="/sell" class="navbar-item">
          Sell Here
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
          </svg>
        </RouterLink>
        <RouterLink to="/map" class="navbar-item">
          Map
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
          </svg>
        </RouterLink>
      </div>

      <section>
        <!-- Placeholder for login/logout buttons -->
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <button class="button is-primary">
                Account
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </nav>

    <!-- Div to make the sidebar and main content sit side by side -->
    <div class="is-flex">
      <Sidebar />
      <main style="flex: 1;">
        <RouterView />
        <!-- <CommentSection /> -->
      </main>
    </div>
  </div>
</template>

<style></style>
