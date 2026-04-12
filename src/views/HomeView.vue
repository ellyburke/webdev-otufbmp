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

async function addItemListing(post) {
    try {
        const formData = new FormData();
        formData.append("name", post.title);
        formData.append("price", post.price);
        formData.append("description", post.description);
        
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

onMounted(() => {
    loadPostsFromServer()
})
</script>

<template>
    <main class="container">
        <PostingCreate @add-post="addItemListing" />
        <br><br>
        <ListOfPostings :posts="posts" />
    </main>
</template>