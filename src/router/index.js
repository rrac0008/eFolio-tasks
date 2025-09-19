import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import { getAuth } from "firebase/auth"
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AdminPageView from "@/views/AdminView.vue"
import AddBookView from '@/views/AddBookView.vue' 
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/denied', name: 'Denied', component: AccessDenied },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: "/admin",
    component: AdminPageView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const user = auth.currentUser  

  if (to.meta.requiresAuth && !user) {
    next('/denied')
  } else if (to.meta.requiresAdmin) {
    if (user && user.email === "admin@admin.com") {
      next()
    } else {
      next('/denied')
    }
  } else {
    next()
  }
})

export default router