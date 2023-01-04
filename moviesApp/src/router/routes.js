import { createRouter, createWebHistory } from "vue-router";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
export const routes = [
  {
    path: "/",
    name: "Movies",
    component: () => import("@/views/Movies/ListAllMovies.vue"),
    // meta: { requireAuth: true },
  },
  {
    path: "/edit/:movieId/movie",
    name: "EditMovie",
    component: () => import("@/views/Movies/EditMovie.vue"),
    meta: { requireAuth: false },
  },
  {
    path: "/create/movie",
    name: "CreateMovie",
    component: () => import("@/views/Movies/CreateMovie.vue"),
    meta: { requireAuth: false, mustBeAdmin: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Auth/Login.vue"),
    meta: { requireAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Auth/Register.vue"),
    meta: { requireAuth: false },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const { token } = storeToRefs(useAuthStore());
  if (to.meta.requireAuth) {
    if (token.value !== null) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
