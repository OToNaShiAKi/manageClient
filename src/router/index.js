import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Main/Home.vue";
import Calendar from "../views/Main/Calendar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "calendar",
        name: "Calendar",
        component: Calendar,
      },
    ],
  },
];

const router = new VueRouter({ routes });

/* router.beforeEach((to, from, next) => {
  
}); */

export default router;
