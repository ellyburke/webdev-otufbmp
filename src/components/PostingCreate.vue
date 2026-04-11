<template>
    <div class="post-box">
        <h2>Put up an Item!</h2>
        <form @submit.prevent="listItem">
            <input v-model="title" placeholder="Name of Item" />
            <input v-model="price" type="number" placeholder="Price" />
            <textarea v-model="description" placeholder="Description for product..."></textarea>

            <button @click="listItem">Post Listing</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            price: 0,
            description: ""
        }
    },

    methods: {
        listItem() {
            if (!this.title.trim()) {
                return;
            }//checks if there is a name for the item

            this.$emit("add-post", {
                title: this.title,
                price: this.price,
                description: this.description,
            })

            this.title = ""
            this.price = 0
            this.description = ""
        }
    }
}
</script>

<style scoped></style>