import Vue from 'vue'
import VueRouter from 'vue-router'
import Jobs from '../views/Jobs'
import Register from '../views/auth/Register'
import Login from '../views/auth/Login'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/jobs'
    },
    {
        path: '/jobs',
        name: 'Jobs',
        component: Jobs
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router