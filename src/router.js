import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
  },
  {
    path: "*",
    redirect: "/home"
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

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.withAuth)) {
//     const logged = JSON.parse(localStorage.getItem("logged"));
//     if (logged && from.path !== "login") {
//       next();
//       return;
//     }
//     next("/login");
//     return;
//   }
//   next();
// });

export default router;
