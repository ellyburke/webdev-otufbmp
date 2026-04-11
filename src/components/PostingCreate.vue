<template>
    <div class="post-box">
        <br>
        <h2 class="title is-2">Start your next sale!</h2>
        <form @submit.prevent="listItem">
            <h2 class="subtitle is-5">Listing title:</h2>
            <input class="input is-info" v-model="title" placeholder="Name of the item..." />
            <br><br>
            <h2 class="subtitle is-5">What's the price:</h2>
            <input class="input is-info" v-model="price" type="number" placeholder="$0" />
            <br><br>
            <h2 class="subtitle is-5">What do people need to know:</h2>
            <textarea class="input is-info" v-model="description" placeholder="Listing description..."></textarea>
            <br><br>
            <button @click="listItem" class="button is-info is-large">Post Listing</button>
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

<style scoped>
textarea {
    min-height: 100px;
    min-width: 50%;
}
</style>