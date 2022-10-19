import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Schedule from '@/views/Schedule.vue'
import FreeTime from '@/views/FreeTime.vue'
import Profile from '@/views/Profile.vue'
import NProgress from 'nprogress'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule
  },
  {
    path: '/free-time',
    name: 'free-time',
    component: FreeTime
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/logout',
    name: 'logout',
    component: HomeView,
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})


export default router
