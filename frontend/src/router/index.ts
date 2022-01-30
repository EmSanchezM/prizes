import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Layout from "@/views/Layout.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Users from "@/views/users/Users.vue";
import UserForm from "@/views/users/UserForm.vue";
import Prizes from "@/views/prizes/Prizes.vue";
import PrizeForm from "@/views/prizes/PrizeForm.vue";

const routes: Array<RouteRecordRaw> = [
    {path: '/login', component: Login},
    {path: '/registro', component: Register},
    {
        path: '',
        component: Layout,
        children: [
            {path: '', redirect: '/usuarios'},
            {path: '/usuarios', component: Users},
            {path: '/usuarios/crear-nuevo', component: UserForm},
            {path: '/premios', component: Prizes},
            {path: '/premios/crear-nuevo', component: PrizeForm},
            {path: '/premios/:id/editar', component: PrizeForm},
        ]
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

