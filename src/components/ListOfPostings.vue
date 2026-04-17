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
}

.post-card {
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.sidebar{
  margin: 0;
}
</style>
