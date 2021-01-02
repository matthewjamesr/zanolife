import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Zano Life - Private Marketplace"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
    meta: {
      title: "Login | Zano Life - Private Marketplace"
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue"),
    meta: {
      title: "Register | Zano Life - Private Marketplace"
    }
  },
  {
    path: "/me",
    name: "profile",
    component: () => import("../views/profile.vue"),
    meta: {
      title: "Profile | Zano Life - Private Marketplace",
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
