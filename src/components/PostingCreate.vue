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
            <h2 class="subtitle is-5">Select the listings location:</h2>
            <div class="control">
                <div class="select">
                    <select v-model="country">
                        <option disabled selected>Select a Country</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Italy">Italy</option>
                        <option value="Spain">Spain</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Norway">Norway</option>
                        <option value="China">China</option>
                        <option value="India">India</option>
                        <option value="Japan">Japan</option>
                        <option value="South Korea">South Korea</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Chile">Chile</option>
                        <option value="Colombia">Colombia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Egypt">Egypt</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Australia">Australia</option>
                        <option value="New Zealand">New Zealand</option>
                    </select>
                </div>
            </div>
            <br><br>
            <button @click="listItem" class="button is-info is-large">
                Post Listing
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                </svg>
            </button>
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
            country: "",
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
                country: this.country,
                image: this.image
            });

            this.title = "";
            this.price = 0;
            this.description = "";
            this.country = "";
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