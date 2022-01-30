import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Layout from "@/views/Layout.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Users from "@/views/Users.vue";
import Prizes from "@/views/Prizes.vue";

const routes: Array<RouteRecordRaw> = [
    {path: '/login', component: Login},
    {path: '/registro', component: Register},
    {
        path: '',
        component: Layout,
        children: [
            {path: '', redirect: '/usuarios'},
            {path: '/usuarios', component: Users},
            {path: '/premios', component: Prizes},
        ]
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

