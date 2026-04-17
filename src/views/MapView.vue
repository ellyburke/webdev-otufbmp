
<script setup>
import { ref } from 'vue'
import Map from '../components/Map.vue'
</script>

<template>
  <br>
  <h1 class="title">Welcome to a World of Possibilities!</h1>
  <div class="map-card">
    <Map></Map>
  </div>
  <br>
  <p>
    <span class="has-text-weight-bold">
      Here you can see the most active countries using quick sale.
      <br><br>
      The darker the shade of blue the location on the map is, the more items have been listed for sale there!
      <br><br>
      List whatever items you want to sell, and maybe your country will become a more darker blue.
    </span>
  </p>
</template>

<style scoped>
.map-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(22, 157, 220, 0.751);
  border: 1px solid #dfe6f3;
}

p {
  font-size: 20px;
}
</style>