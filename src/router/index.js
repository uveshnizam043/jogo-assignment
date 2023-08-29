import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home/index.vue'
// import Home from '../views/chat/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/index.vue')
    },
  
    {
      path: '/chat',
      name: 'chat',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/chat/index.vue')
    }
  ]
})

export default router
