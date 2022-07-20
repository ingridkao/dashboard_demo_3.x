import { createRouter, createWebHistory } from 'vue-router'
import MyView from '../views/MyView.vue'
import CityView from '../views/CityView.vue'
import FeedbackView from '../views/FeedbackView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: CityView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: MyView
  },
  {
    path: '/city',
    redirect: '/'
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: FeedbackView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
