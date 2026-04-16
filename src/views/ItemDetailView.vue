<script setup>
import { onMounted, ref } from 'vue'
import CommentSection from '@/components/CommentSection.vue'
import RatingSection from '@/components/RatingSection.vue'

const postData = ref('')

onMounted(() => {
    const post = history.state.post
    if (post) {
        postData.value = post
    }
})
</script>

<template>
    <div v-if="postData">
        <h1>{{ postData.name }}</h1>
        <p>{{ postData.description }}</p>
        <RatingSection :itemId="postData.id" />

        <img
            v-if="postData.image_url"
            :src="postData.image_url"
            alt="Image of listing item."
        />
    </div>
    <CommentSection :postId="postData.id" />
</template>