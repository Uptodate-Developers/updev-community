import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'

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
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { layout: AppLayout }
    },
]

const router = createRouter({ history: createWebHistory(), routes });

export default router