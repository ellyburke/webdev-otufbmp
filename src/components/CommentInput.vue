<script setup>
import { ref } from 'vue'

const commentUser = ref('')
const commentText = ref('')
const emit = defineEmits(['new-comment'])

const submitComment = () => {
    if (!commentUser.value || !commentText.value) return;
    emit('new-comment', commentUser.value, commentText.value);
    commentText.value = '';
}

</script>

<template>
    <div class="field">
        <div class="control">
            <input v-model="commentUser" class="input" type="text" placeholder="Your Name"></input>
            <textarea v-model="commentText" class="textarea" placeholder="Comment here..."></textarea>
        </div>
        <div class="control mt-5">
            <button @click="submitComment" class="button is-link">Submit</button>
        </div>
    </div>
</template>