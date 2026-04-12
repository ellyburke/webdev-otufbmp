<script setup>
import PostingCreate from '../components/PostingCreate.vue';
import ListOfPostings from '../components/ListOfPostings.vue';
import { ref, onMounted } from "vue"

const posts = ref([])

async function loadPostsFromServer() {
    try {
        const response = await fetch("http://localhost:3000/all-items");
        const data = await response.json();
        posts.value = data;
    } catch (error) {
        console.error("Error loading posts:", error);
    }
}

onMounted(() => {
    loadPostsFromServer()
})
</script>

<template>
    <main class="container">
        <ListOfPostings :posts="posts" />
    </main>
</template>