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
        <RouterLink to="/sell" class="navbar-item">Sell Here</RouterLink>
        <RouterLink to="/map" class="navbar-item">Map</RouterLink>
      </div>

      <section>
        <!-- Placeholder for login/logout buttons -->
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <button class="button is-primary">Account</button>
            </div>
          </div>
        </div>
      </section>
    </nav>

    <!-- Div to make the sidebar and main content sit side by side -->
    <div class="is-flex">
      <Sidebar />
      <main>
        <RouterView />
        <!-- <CommentSection /> -->
      </main>
    </div>
  </div>
</template>

<style></style>
