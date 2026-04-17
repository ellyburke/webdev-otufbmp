<template>
  <main class="container p-5">
    <h1 class="title">Create Account</h1>

    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input v-model="username" class="input" type="text" />
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input v-model="email" class="input" type="email" />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input v-model="password" class="input" type="password" />
      </div>
    </div>

    <p v-if="message" class="mb-3">{{ message }}</p>

    <button class="button is-primary" @click="registerUser">Create Account</button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const message = ref('')
const router = useRouter()

async function registerUser() {
  message.value = ''

  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    message.value = data.error || 'Failed to create account'
    return
  }

  localStorage.setItem('currentUser', JSON.stringify(data))
  router.push('/')
  window.location.reload()
}
</script>