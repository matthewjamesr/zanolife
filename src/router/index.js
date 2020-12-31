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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next()
})

export default router;
