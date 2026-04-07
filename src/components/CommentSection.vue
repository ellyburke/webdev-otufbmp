<script setup>
import { onMounted, ref } from 'vue'
import CommentInput from './CommentInput.vue';

const comments = ref([]);

const loadComments = async() => {
    const response = await fetch(`http://localhost:3000/items?id=${1}`);
    const data = await response.json();
    comments.value = data.comments;
}

onMounted(() => {
    loadComments();
})

const handleNewComment = async (commentUser, commentText) => {
    const newComment = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item_id: 1,
            user: commentUser,
            text: commentText
        })
    });
    if(newComment.ok) {
        loadComments();
    }
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