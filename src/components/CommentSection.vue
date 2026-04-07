<script setup>
import { ref } from 'vue'
import CommentInput from './CommentInput.vue';

const comments = ref([])

const handleNewComment = (commentUser, commentText) => {
    comments.value.push({ user: commentUser, text: commentText });
}

</script>

<template>
    <div class="card">
        <p v-for="comment in comments">
            {{comment.user}}: {{ comment.text }}
        </p>
    </div>
    <CommentInput @new-comment="handleNewComment"/>
</template>