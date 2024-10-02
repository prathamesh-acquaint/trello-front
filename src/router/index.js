import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { publicRoutes } from '@/constant'
import CommonLayout from '@/components/layouts/CommonLayout.vue'
import { checkToken } from '@/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: CommonLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: '/boards/:boardId',
          name: 'board',
          component: () => import('../views/board/BoardView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue')
    }
  ]
})

router.beforeEach((to) => {
  if (publicRoutes.includes(to.name)) {
    if (checkToken()) {
      return '/'
    } else {
      return true
    }
  } else {
    if (checkToken()) {
      return true
    } else {
      return '/login'
    }
  }
})

export default router
