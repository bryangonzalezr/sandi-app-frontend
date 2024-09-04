import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('@/views/RegisterPage.vue')
  },
  {
    path: '/',
    meta: { requiresAuth: true },
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
        component: () => import('@/views/ProfilePage.vue'),
      },
      {
        path: 'patients',
        name: 'Patients',
        component: () => import('@/views/PatientsPage.vue')
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
    path: '/patient/:id',
    name: 'PatientProfile',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 0 } : { id };
    },
    component: () => import('@/views/ProfilePage2.vue')
  },
  {
    path: '/consult/:id',
    name: 'ConsultPage',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 0 } : { id };
    },
    component: () => import('@/views/ConsultPage.vue'),
  },
  {
    path: '/patient/progress/:id',
    name: 'PatientProgress',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 0 } : { id };
    },
    component: () => import('@/components/PatientProgress.vue')
  },
  {
    path: '/patient/plan-create/:id',
    name: 'PatientPlanCreate',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 0 } : { id };
    },
    component: () => import('@/components/PlanNutritional.vue')
  },
  {
    path: '/profile/progress/:id',
    meta: { requiresAuth: true },
    name: 'ProgressDetail',
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 0 } : { id };
    },
    component: () => import('@/components/UserProgress.vue')
  },
  {
    path: '/chat',
    meta: { requiresAuth: true },
    name: 'Chat',
    component: () => import('@/views/ChatPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  const privateRoutes = to.matched.some((record) => record.meta.requiresAuth);

  import("@/stores").then(({ useAuthStore }) =>{
    const userAuth = useAuthStore();
    const data = userAuth.SessionUser();
  
    const loggedIn = localStorage.getItem("user");
  
      if (!data && privateRoutes && loggedIn) {
        localStorage.setItem("lastPath", to.fullPath);
        localStorage.removeItem("user");
        localStorage.removeItem("rolUser");
        localStorage.removeItem("roles");
        localStorage.removeItem("authToken");
  
        next({ name: "Login"})
      }
  
      // Si la ruta es privada y el usuario no esta logueado lo redirecciona a la pagina de login
      if (privateRoutes && !loggedIn) {
        next({ name: "Login" });
        return;
      }
  
      // Si la ruta es publica y el usuario esta logueado lo redirecciona a la pagina de inicio
      if (!privateRoutes && loggedIn) {
        next({ name: "Home" });
        return;
      }
  
      next();
  });
  

  });

export default router
