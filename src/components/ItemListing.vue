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

    <div v-if="post.image_url" class="image-box">
        <img :src="`http://localhost:3000${post.image_url}`" alt="Image from Post" />
    </div>

    <p class="price">${{ post.price }}</p>
    <RatingSection :itemId="post.id" compact />
    <p class="description">{{ post.description }}</p>
  </div>
</template>

<style scoped>
.post-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.image-box {
  width: 100%;
  height: 150px;
  overflow: hidden;
  margin: 10px 0;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
