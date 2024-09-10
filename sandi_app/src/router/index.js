import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  // ----------- RUTAS PÚBLICAS -----------
  {
    path: '/login',
    name: 'Login',
    meta: { requiresAuth: false },
    component: () => import('@/views/AuthLogin.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    meta: { requiresAuth: false },
    component: () => import('@/views/AuthRegister.vue')
  },
  // ----------- RUTAS PRIVADAS -----------
  // Rutas navegación con tab
  {
    path: '/',
    meta: { requiresAuth: true },
    component: () => import('@/views/NavTabs.vue'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/ProfilePage.vue'),
      },
      {
        path: 'patients',
        name: 'Patients',
        component: () => import('@/views/NutritionistPatients.vue')
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/MenuPage.vue')
      },
      {
        path: 'recipe',
        name: 'Recipe',
        component: () => import('@/views/RecipePage.vue')
      },
    ]
  },
  // rutas vista nutricionista
  {
    path: '/patient/:id',
    name: 'PatientProfile',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 0 } : { id };
    },
    component: () => import('@/components/NutritionistPatientProfile.vue')
  },
  {
    path: '/consult/:id',
    name: 'NutritionistConsult',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 0 } : { id };
    },
    component: () => import('@/components/NutritionistConsult.vue'),
  },
  {
    path: '/patient/progress/:id',
    name: 'PatientProgress',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 0 } : { id };
    },
    component: () => import('@/components/NutritionistPatientProgress.vue')
  },
  {
    path: '/patient/plan-nutritional/:id',
    name: 'PatientPlanCreate',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 0 } : { id };
    },
    component: () => import('@/components/NutritionistPlanNutritional.vue')
  },
  {
    path: '/planes-archivados',
    name: 'PlansFiled',
    meta: { requiresAuth: true },
    component: () => import('@/components/NutritionistPlanFiled.vue')
  },
  // rutas vista paciente
  {
    path: '/profile/progress/:id',
    name: 'ProgressDetail',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 0 } : { id };
    },
    component: () => import('@/components/PatientProgress.vue')
  },
  // Rutas Generales
  {
    path: '/chat',
    name: 'Chat',
    meta: { requiresAuth: true },
    component: () => import('@/views/ChatBot.vue')
  },
  {
    path: '/recipe-details',
    name: 'RecipeDetail',
    meta: { requiresAuth: true },
    component: () => import('@/components/RecipeDetails.vue'),
  },
  {
    path: '/recipe-save',
    name: 'RecipeList',
    meta: { requiresAuth: true },
    component: () => import('@/components/RecipeList.vue'),
  },
  {
    path: '/menu-details/:type/:id',
    name: 'MenuDetail',
    meta: { requiresAuth: true },
    component: () => import('@/components/MenuDetails.vue'),
  },
  {
    path: '/menu-save',
    name: 'MenuList',
    meta: { requiresAuth: true },
    component: () => import('@/components/MenuList.vue'),
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
