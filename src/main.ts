import './assets/main.css'
import 'bulma/css/bulma.min.css'

import { createWebHistory, createRouter } from 'vue-router'
import { createApp } from 'vue'
import ItemDetailView from './views/ItemDetailView.vue'
import HomeView from './views/HomeView.vue'
import SellView from './views/SellView.vue'
import MapView from './views/MapView.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import App from './App.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/item/:id', component: ItemDetailView },
  { path: '/sell', component: SellView, meta: { requiresAuth: true } },
  { path: '/map', component: MapView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem('currentUser')

  if (to.meta.requiresAuth && !currentUser) {
    next('/login')
    return
  }

  next()
})

const app = createApp(App)
app.use(router)
app.mount('#app')