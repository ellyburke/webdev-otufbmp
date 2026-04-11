<script>
import ItemListing from './ItemListing.vue';

export default {
    components: { ItemListing },
    props: ["posts"]
}
</script>

<template>
    <div>
        <ItemListing v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
</template>