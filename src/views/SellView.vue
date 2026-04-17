<script setup>
import PostingCreate from '../components/PostingCreate.vue'
import { ref } from 'vue'

const posts = ref([])

async function addItemListing(post) {
  try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

    if (!currentUser) {
      alert('Please log in before posting an item.')
      return
    }

    const formData = new FormData()
    formData.append('name', post.title)
    formData.append('price', post.price)
    formData.append('description', post.description)
    formData.append('country', post.country)
    formData.append('account_id', String(currentUser.id))

    if (post.image) {
      formData.append('image', post.image)
    }

    const response = await fetch('http://localhost:3000/items', {
      method: 'POST',
      body: formData,
    })

    const addedPost = await response.json()
    posts.value.unshift(addedPost)
    alert('Listing created successfully.')
  } catch (error) {
    console.error('Error: ', error)
  }
}
</script>

<template>
    <main class="container">
        <PostingCreate @add-post="addItemListing" />
    </main>
</template>