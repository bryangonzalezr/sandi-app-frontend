import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/HomePage.vue'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/StartPage.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/ProfilePage.vue')
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/MenuPage.vue')
      },
      {
        path: 'menu-recipe',
        name: 'MenuRecipe',
        component: () => import('@/components/RecipeMenu.vue'),
      },
      {
        path: 'recipe',
        name: 'Recipe',
        component: () => import('@/views/RecipePage.vue')
      }
    ]
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/ChatPage.vue')
  },
  {
    path: '/voice',
    name: 'Voice',
    component: () => import('@/views/Voice2Page.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
