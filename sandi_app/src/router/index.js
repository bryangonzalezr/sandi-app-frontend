import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
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
        path: 'menu-save',
        name: 'MenuList',
        component: () => import('@/components/MenuList.vue'),
      },
      {
        path: 'menu-details/:type/:id',
        name: 'MenuDetail',
        component: () => import('@/components/MenuDetails.vue'),
      },
      {
        path: 'recipe',
        name: 'Recipe',
        component: () => import('@/views/RecipePage.vue')
      },
      {
        path: 'recipe-details',
        name: 'RecipeDetail',
        component: () => import('@/components/RecipeDetails.vue'),
      },
      {
        path: 'recipe-save',
        name: 'RecipeList',
        component: () => import('@/components/RecipeList.vue'),
      },
    ]
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/ChatPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
