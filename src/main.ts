import './assets/main.css'
import 'bulma/css/bulma.min.css'

import { createWebHistory, createRouter } from 'vue-router'
import { createApp } from 'vue'
import ItemDetailView from './views/ItemDetailView.vue'
import HomeView from './views/HomeView.vue'
import SellView from './views/SellView.vue'
import MapView from './views/MapView.vue'
import App from './App.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/item/:id', component: ItemDetailView },
  { path: '/sell', component: SellView },
  { path: '/map', component: MapView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
