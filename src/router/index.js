import { createRouter, createWebHistory } from 'vue-router'
import MyView from '../views/MyView.vue'
import CityView from '../views/CityView.vue'
import MapView from '../views/MapView.vue'
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
        name: 'city',
        redirect: '/'
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: FeedbackView
    },
    {
        path: '/mapview',
        name: 'mapview',
        component: MapView
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

export const Navigation = [
    {index: "dashboard", name: "我的儀表板", disabled: false},
    {index: "city", name: "城市洞察", disabled: false},
    {index: "feedback", name: "許願池", disabled: true}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    base: process.env.BASE_URL,
    routes
})

export default router
