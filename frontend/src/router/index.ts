import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Layout from "@/views/Layout.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Users from "@/views/Users.vue";

const routes: Array<RouteRecordRaw> = [
    {path: '/login', component: Login},
    {path: '/registro', component: Register},
    {
        path: '',
        component: Layout,
        children: [
            {path: '', redirect: '/usuarios'},
            {path: '/usuarios', component: Users},
        ]
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


