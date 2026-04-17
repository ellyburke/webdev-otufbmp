<script setup>
import CommentSection from './CommentSection.vue'
import RatingSection from './RatingSection.vue';

defineProps({
    post: Object
})
</script>

<template>
  <div class="post-box">
    <RouterLink :to="{ path: `/item/${post.id}`, state: { post: { ...post } } }" class="title"
      >{{ post.name }}
    </RouterLink>

    <div v-if="post.image_url">
      <img :src="`http://localhost:3000${post.image_url}`" alt="Image from Post" />
    </div>

    <p class="price">${{ post.price }}</p>
    <RatingSection :itemId="post.id" compact />
    <p class="description">{{ post.description }}</p>
  </div>
</template>

<style scoped>
img {
  max-width: 500px;
  max-height: 500px;
  object-fit: cover;
  margin: 12px 0;
}
</style>
