<script setup>
import CommentSection from './CommentSection.vue';

defineProps({
    post: Object
})

</script>

<template>
    <div class="post-box">
        <h2 class="title">{{ post.name }}</h2>
        <p class="price">${{ post.price }}</p>
        <p class="description">{{ post.description }}</p>

        <CommentSection :postId="post.id" />
    </div>
</template>