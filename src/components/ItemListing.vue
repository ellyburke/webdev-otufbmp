<script setup>
import CommentSection from './CommentSection.vue';

defineProps({
    post: Object
})

</script>

<template>
    <div class="post-box">
        <RouterLink :to="{ path: `/item/${post.id}`, state: { post: { ...post } } }" class="title">{{ post.name }}
        </RouterLink>
        <p class="price">${{ post.price }}</p>
        <p class="description">{{ post.description }}</p>
    </div>
</template>