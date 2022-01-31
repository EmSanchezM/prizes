import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Layout from "@/views/Layout.vue";
//Auth
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
//CRUD Users
import Users from "@/views/users/Users.vue";
import UserForm from "@/views/users/UserForm.vue";
import PointsForm from "@/views/users/PointsForm.vue";

//CRUD Prizes
import Prizes from "@/views/prizes/Prizes.vue";
import PrizeForm from "@/views/prizes/PrizeForm.vue";

//Exchanges 
import Exchanges from '@/views/exchanges/Exchanges.vue';
import ExchangeForm from "@/views/exchanges/ExchangeForm.vue";

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
            {path: '/usuarios/:id/puntos', component: PointsForm},
            {path: '/premios', component: Prizes},
            {path: '/premios/crear-nuevo', component: PrizeForm},
            {path: '/premios/:id/editar', component: PrizeForm},
            {path: '/canjear-premios', component: Exchanges},
            {path: '/canjear-premios/:id', component: ExchangeForm},
        ]
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

