<script setup>
import CommentInput from './components/CommentInput.vue';
import CommentSection from './components/CommentSection.vue';

import PostingCreate from './components/PostingCreate.vue';
import ListOfPostings from './components/ListOfPostings.vue';

import { ref , onMounted } from "vue"

const posts = ref([])

//Gettng item listings from server
async function loadPostsFromServer() {
  try {
    const response = await fetch("http://localhost:3000/all-items")
    const data = await response.json()
    posts.value = data
  } catch (error) {
    console.error("Error loading posts:", error)
  }
}

//adding a new item listing
async function addItemListing(post) {
  try {
    const response = await fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: post.title,
        price: post.price,
        description: post.description
      })
    })

    const addedPost = await response.json()

    posts.value.unshift(addedPost)
  } catch (error) {
    console.error("Error: ", error)
  }
}

onMounted(() => {
  loadPostsFromServer()
})

</script>

<template>
  <main>
    <PostingCreate @add-post="addItemListing" />
    <ListOfPostings :posts="posts" />
    <CommentSection />
  </main>
</template>

<style scoped>
</style>
