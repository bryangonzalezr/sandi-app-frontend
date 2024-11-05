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
        path: '/menu-save',
        name: 'MenuList',
        meta: { requiresAuth: true },
        component: () => import('@/components/MenuList.vue'),
      },
      {
        path: '/recipe-save',
        name: 'RecipeList',
        meta: { requiresAuth: true },
        component: () => import('@/views/RecipePage.vue'),
      },
    ]
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
  {
    path: '/prfile/pauta/:id',
    name: 'PautaDetail',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 0 } : { id };
    },
    component: () => import('@/components/PatientPauta.vue')
  },
  {
    path: '/chat-nutricionista',
    name: 'ChatNutritionist',
    meta: { requiresAuth: true },
    component: () => import('@/views/ChatNutritionist.vue')
  },
  {
    path: '/detalles-menu/:type/',
    name: 'MenuDetail',
    meta: { requiresAuth: true },
    component: () => import('@/components/MenuDetails.vue'),
  },
  {
    path: '/sandi/detalles-menu/:type/',
    name: 'MenuSandiDetail',
    meta: { requiresAuth: true },
    component: () => import('@/components/MenuSandiDetails.vue'),
  },
  {
    path: '/listas-de-compras',
    name: 'ShopList',
    meta: { requiresAuth: true },
    component: () => import('@/components/ShopList.vue'),
  },
  {
    path: '/listas-de-compras/detalles/:id',
    name: 'ShopListDetails',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = route.params.id;
      return { id };
    },
    component: () => import('@/components/ShopListDetails.vue'),
  },
  // Rutas usuario Básico
  {
    path: '/tarjetas-contacto',
    name: 'ContactCards',
    meta: { requiresAuth: true },
    component: () => import('@/components/ContactCards.vue')
  },
  {
    path: '/detalles-contacto/:color/:id',
    name: 'ContactDetails',
    meta: { requiresAuth: true },
    props: (route) => {
      const id = route.params.id;
      const color = route.params.color;
      return { color, id };
    },
    component: () => import('@/components/ContactDetails.vue'),
  },
  // Rutas Generales
  {
    path: '/chat-asistente',
    name: 'ChatBot',
    meta: { requiresAuth: true },
    component: () => import('@/views/ChatBot.vue')
  },
  {
    path: '/detalles-recetas',
    name: 'RecipeDetail',
    meta: { requiresAuth: true },
    component: () => import('@/components/RecipeDetails.vue'),
  }
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
