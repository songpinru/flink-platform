import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { type Router } from './type';



export const userRouters: RouteRecordRaw[] = [
  {
    path: '/application',
    name: 'application',
    component: () => import('@/views/home/Layout.vue'),
    children: [
      {
        path: '/application/list',
        name: 'applist',
        component: () => import('@/views/home/main/ApplicationView.vue')
      },
      {
        path: '/application/about',
        name: 'appabout',
        component: () => import('@/views/home/main/AboutView.vue')
      },
    ]
  },
  {
    path: '/env',
    name: 'env',
    component: () => import('@/views/home/Layout.vue'),
    children: [
      {
        path: '/env/list',
        name: 'envlist',
        component: () => import('@/views/home/main/EnvView.vue')
      },
      {
        path: '/env/about',
        name: 'envabout',
        component: () => import('@/views/home/main/AboutView.vue')
      },
    ]
  }
];

export const commonRouter: RouteRecordRaw[] = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    //重定向
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'NotFound',
  },
  {
    path: '/',
    name: 'index',
    redirect:'/home',
    component: () => import('@/views/home/Layout.vue'),
    children: [
      {
        path: '/home',
        name: 'name',
        component: () => import('@/views/home/main/Welcome.vue')
      }
    ]
  },
  ...userRouters
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: commonRouter
})

export default router;

export const pathMap: Router = {
  applist: "application",
  appabout: "About",
  envlist: "Environment",
  envabout: "About",
};
