import './assets/main.css'

import { createWebHistory, createRouter } from 'vue-router'
import { createApp } from 'vue'
import ItemDetailView from './views/ItemDetailView.vue'
import HomeView from './views/HomeView.vue'
import SellView from './views/SellView.vue'
import 'bulma/css/bulma.css'
import App from './App.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/item/:id', component: ItemDetailView },
  { path: '/sell', component: SellView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
