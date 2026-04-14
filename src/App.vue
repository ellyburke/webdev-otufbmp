<script setup>
import CommentInput from './components/CommentInput.vue';
import CommentSection from './components/CommentSection.vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <Navbar />
  
  <!-- To wrap the sidebar and the main content so they are side by side -->
  <div class="content-wrapper">
    <Sidebar />
    <main>
      <!-- <CommentSection /> -->
      
    </main>
  </div>
</template>

<style scoped>
.content-wrapper{
  display: flex;
}
</style>
