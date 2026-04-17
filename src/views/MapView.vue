
<script setup>
import { ref } from 'vue'
import Map from '../components/Map.vue'
</script>

<template>
  <br>
  <h1 class="title">Welcome to a World of Possibilities!</h1>
  <div>
    <Map></Map>
  </div>
  <br>
  <p>
    Here you can see the most active countries using <span class="has-text-weight-bold">quick sale</span>.
    <br><br>
    The darker the shade of blue the location on the map is, the more items have been listed for sale there!
    <br><br>
    List whatever items you want to sell, and maybe your country will become a more darker blue.
  </p>
</template>

<style scoped>
p {
  font-size: 20px;
}
</style>