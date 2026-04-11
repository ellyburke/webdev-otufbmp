<script setup>
import { onMounted, ref } from 'vue'
import CommentSection from '@/components/CommentSection.vue'

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
    </div>
    <CommentSection :postId="postData.id" />
</template>