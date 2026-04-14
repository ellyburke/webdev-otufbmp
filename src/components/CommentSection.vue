<script setup>
import { onMounted, ref, watch } from 'vue'
import CommentInput from './CommentInput.vue';

//implementing props to define unique comment section for each post
const props = defineProps({
    postId: Number
})
//*****

const comments = ref([]);

const loadComments = async () => {
    const response = await fetch(`http://localhost:3000/items?id=${props.postId}`);
    const data = await response.json();
    comments.value = data.comments;
}

onMounted(() => {
    loadComments();
})

//using watch to ensure post stream is updated: https://vuejs.org/guide/essentials/watchers
watch(() => props.postId, () => {
    loadComments();
})

const handleNewComment = async (commentUser, commentText) => {
    const newComment = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item_id: props.postId,
            user: commentUser,
            text: commentText
        })
    });
    if (newComment.ok) {
        loadComments();
    }
}

</script>

<template>
    <div class="card">
        <p v-for="comment in comments" :key="comment.id">
            {{ comment.user }}: {{ comment.text }}
        </p>
    </div>
    <CommentInput @new-comment="handleNewComment" />
</template>