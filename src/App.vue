<script setup>
import { computed } from 'vue'
import Sidebar from './components/Sidebar.vue'

const currentUser = computed(() => {
  const raw = localStorage.getItem('currentUser')
  return raw ? JSON.parse(raw) : null
})

function logout() {
  localStorage.removeItem('currentUser')
  window.location.href = '/'
}
</script>

<template>
  <div class="">
    <nav class="navbar is-dark is-flex is-justify-content-space-between">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item">
          <img src="./assets/site_logo.png" class="site_logo"/>
        </RouterLink>

        <RouterLink to="/sell" class="navbar-item">
          Sell Here
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
          </svg>
        </RouterLink>

        <RouterLink to="/map" class="navbar-item">
          Map
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
          </svg>
        </RouterLink>
      </div>

      <section>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" v-if="!currentUser">
              <RouterLink to="/register" class="button is-primary">
                Sign up
              </RouterLink>
              <RouterLink to="/login" class="button is-light">
                Log in
              </RouterLink>
            </div>

            <div class="buttons" v-else>
              <span class="button is-static">
                Hi, {{ currentUser.username }}
              </span>
              <button class="button is-primary" @click="logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
    </nav>

    
   <main class="page-content">
      <RouterView />
    </main>
    
  </div>
</template>

<style scoped>
.page-layout {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 24px;
}

.page-content {
  flex: 1;
}

.site_logo {
  width: 200px;
  max-height: none;
  height: 100px;
}
</style>