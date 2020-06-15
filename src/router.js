import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Login from "./pages/Login.vue";
import Films from "./pages/Films.vue";
import Planets from "./pages/Planets.vue";

const routes = [
  {
    path: "/login",
    component: Login,
    name: "Login"
  },
  {
    path: "/films",
    component: Films,
    name: "Films",
    meta: {
      withAuth: true
    }
  },
  {
    path: "/films/:id/planets",
    component: Planets,
    name: "Planets",
    meta: {
      withAuth: true
    }
  },
  {
    path: "*",
    redirect: "/login"
  }
];

const router = new VueRouter({
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  },
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.withAuth)) {
    const logged = JSON.parse(localStorage.getItem("logged"));
    if (logged && from.path !== "login") {
      next();
      return;
    }
    next("/login");
    return;
  }
  next();
});

export default router;
