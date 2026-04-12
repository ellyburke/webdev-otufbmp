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
            <h2 class="subtitle is-5">Upload an image of your item:</h2>
            <input class="input is-info" type="file" accept="image/*" @change="handleImageUpload" />
            <br><br>
            <button @click="listItem" class="button is-info is-large">Post Listing</button>
            <br><br>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            price: 0,
            description: "",
            image: null
        };
    },

    methods: {
        handleImageUpload(event) {
            this.image = event.target.files[0];//only take in first selected file
        },

        listItem() {
            if (!this.title.trim()) {
                return;
            }//checks if there is a name for the item

            this.$emit("add-post", {
                title: this.title,
                price: this.price,
                description: this.description,
                image: this.image
            });

            this.title = "";
            this.price = 0;
            this.description = "";
            this.image = null;
        }
    }
};
</script>

<style scoped>
textarea {
    min-height: 100px;
    min-width: 50%;
}
</style>