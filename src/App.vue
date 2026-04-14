<script setup>
import CommentInput from './components/CommentInput.vue';
import CommentSection from './components/CommentSection.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div>
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item">OT Marketplace</RouterLink>
        <RouterLink to="/sell" class="navbar-item">Sell Here</RouterLink>
        <RouterLink to="/map" class="navbar-item">Map</RouterLink>
      </div>
    </nav>

    <Sidebar />
    <main>
      <!-- <CommentSection /> -->
      
    </main>
    <RouterView /> 
  </div>
</template>

<style>
</style>