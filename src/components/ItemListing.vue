<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RatingSection from './RatingSection.vue'
import { PostsService } from '../services/PostsService'

const props = defineProps({
  post: Object,
})

const postsService = new PostsService()
const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
const isFavourited = ref(false)

async function checkIfFavourited() {
  if (!currentUser || !props.post?.id) return

  const favourites = await postsService.getFavouritePosts(currentUser.id)
  isFavourited.value = favourites.some((fav: any) => fav.id === props.post.id)
}

async function toggleFavourite() {
  if (!currentUser || !props.post?.id) {
    alert('Please log in to favourite posts.')
    return
  }

  let result

  if (isFavourited.value) {
    result = await postsService.removeFavourite(currentUser.id, props.post.id)
    if (result?.success) {
      isFavourited.value = false
    } else {
      alert(result?.error || 'Failed to remove favourite')
    }
  } else {
    result = await postsService.addFavourite(currentUser.id, props.post.id)
    if (result?.success) {
      isFavourited.value = true
    } else {
      alert(result?.error || 'Failed to add favourite')
    }
  }
}

async function deletePost() {
  if (!currentUser || !props.post?.id) return

  const confirmed = window.confirm('Are you sure you want to delete this post?')
  if (!confirmed) return

  const result = await postsService.deletePost(props.post.id, currentUser.id)

  if (result?.success) {
    window.location.reload()
  } else {
    alert(result?.error || 'Failed to delete post')
  }
}

onMounted(() => {
  checkIfFavourited()
})
</script>

<template>
  <div class="post-box">
    <RouterLink :to="{ path: `/item/${post.id}`, state: { post: { ...post } } }" class="title">
      {{ post.name }}
    </RouterLink>

    <div v-if="post.image_url" class="image-box">
      <img :src="`http://localhost:3000${post.image_url}`" alt="Image from Post" />
    </div>

    <p class="price">${{ Number(post.price).toFixed(2) }}</p>
    <RatingSection :itemId="post.id" compact />
    <p class="description">{{ post.description }}</p>

    <button
      v-if="currentUser"
      class="button is-warning is-small mt-3"
      @click="toggleFavourite"
    >
      {{ isFavourited ? 'Unfavourite' : 'Favourite' }}
    </button>

    <button
      v-if="currentUser && currentUser.id === post.account_id"
      class="button is-danger is-small mt-3"
      @click="deletePost"
    >
      Delete
    </button>
  </div>
</template>

<style scoped>
.post-box {
  height: 100%;
  padding: 18px;
  border-radius: 18px;
  background-color: white !important;
  opacity: 1 !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid #dfe6f3;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  display: block;
  padding-top: 4px;
  padding-left: 4px;
  padding-right: 4px;
  margin-bottom: 4px;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
  color: #1f2a44;
  text-decoration: none;
}

.title:hover {
  color: #2f63ff;
}

.image-box {
  width: 100%;
  height: 210px;
  overflow: hidden;
  border-radius: 14px;
  background: #eef3ff;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.price {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1947d1;
  margin: 0;
}

.description {
  margin: 0;
  color: #3f4b66;
  line-height: 1.45;
}
</style>