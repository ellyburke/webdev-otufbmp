<script>
import ItemListing from './ItemListing.vue';

export default {
    components: { ItemListing },
    props: ["posts"]
}
</script>

<template>
    <div class="fixed-grid has-3-cols">
        <div class="grid">
            <ItemListing class = "card pt-3 pb-3"v-for="(post, index) in posts" :key="index" :post="post" />
        </div>
    </div>
</template>