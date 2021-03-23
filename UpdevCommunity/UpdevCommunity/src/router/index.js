import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LandingPage,
        meta: { layout: MainLayout }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { layout: MainLayout }
    },
]

const router = createRouter({ history: createWebHistory(), routes });

export default router