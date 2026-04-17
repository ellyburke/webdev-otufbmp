<script setup>
import PostingCreate from '../components/PostingCreate.vue';
import { ref, onMounted } from "vue"

const posts = ref([])

async function addItemListing(post) {
    try {
        const formData = new FormData();
        formData.append("name", post.title);
        formData.append("price", post.price);
        formData.append("description", post.description);
        formData.append("country", post.country);
        
        if (post.image) {
            formData.append("image", post.image);
        }

        const response = await fetch("http://localhost:3000/items", {
            method: "POST",
            body: formData
        });

        const addedPost = await response.json();
        posts.value.unshift(addedPost);

    } catch (error) {
        console.error("Error: ", error);
    }
}
</script>

<template>
    <main class="container">
        <PostingCreate @add-post="addItemListing" />
    </main>
</template>