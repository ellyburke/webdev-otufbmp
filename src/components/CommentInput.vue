<script setup>
import { ref } from 'vue'

const commentText = ref('');
const emit = defineEmits(['new-comment'])

const submitComment = () => {
    emit('new-comment', commentText.value);
    commentText.value = '';
}

</script>

<template>
    <div class="field">
        <div class="control">
            <textarea v-model="commentText" class="textarea" placeholder="Comment here..."></textarea>
        </div>
        <div class="control mt-5">
            <button @click="submitComment"class="button is-link">Submit</button>
        </div>
    </div>
</template>