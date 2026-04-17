<template>
  <main class="container p-5">
    <h1 class="title">Login</h1>

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

    <p v-if="errorMessage" class="has-text-danger mb-3">{{ errorMessage }}</p>

    <button class="button is-primary" @click="loginUser">Login</button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

async function loginUser() {
  errorMessage.value = ''

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    errorMessage.value = data.error || 'Login failed'
    return
  }

  localStorage.setItem('currentUser', JSON.stringify(data))
  router.push('/')
  window.location.reload()
}
</script>