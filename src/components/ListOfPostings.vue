<script>
import ItemListing from './ItemListing.vue'

export default {
  components: { ItemListing},
  props: ['posts'],
}
</script>

<template>
  <div class="is-flex layout is-fullwidth">
    <div class="post-grid">
    <ItemListing
      class="card post-card"
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
    />
    </div>
  </div>
  
</template>

<style scoped>
.post-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: stretch;
}

.post-card {
  height: 100%;
  overflow: hidden;
  background: white !important;
  box-shadow: none;
  border-radius: 18px;
}

.sidebar{
  margin: 0;
}
</style>
