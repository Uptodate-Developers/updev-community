import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import AppHome from '../views/AppHome.vue'
import AppNotification from '../views/AppNotification.vue'
import AppPost from '../views/AppPost.vue'

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
        path: '/app/profile/:profileId?',
        name: 'Profile',
        component: Profile,
        meta: { layout: AppLayout },
        props:true
    },
    {
        path: '/app/home',
        name: 'AppHome',
        component: AppHome,
        meta: { layout: AppLayout }
    },
    {
        path: '/app',
        name: 'AppHome',
        component: AppHome,
        meta: { layout: AppLayout }
    },
    {
        path: '/app/notifications',
        name: 'AppNotification',
        component: AppNotification,
        meta: {layout: AppLayout}
        
    },
    {
        path: '/app/post/:id',
        name: 'AppPost',
        component: AppPost,
        meta: {layout: AppLayout},
        props:true
    }
]

const router = createRouter({ history: createWebHistory(), routes });

export default router