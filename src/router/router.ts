import { createRouter, createWebHistory } from 'vue-router'
import { RouteNameEnum } from './router.types'
import { AppLayoutEnum } from '@/layouts/layouts.types'
import { loadLayoutMiddleware } from './middleware/loadLayoutMiddelware'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: RouteNameEnum.home,
      component: () => import('@/pages/HomePage.vue'),
      meta: {
        layout: AppLayoutEnum.default
      }
    }
  ]
})

router.beforeEach(loadLayoutMiddleware)
