import Vue from "vue";
import VueRouter from "vue-router";
import List from "../views/List.vue";
const Login = () => import("../views/Login.vue");
import Admin from "../views/admin/Admin.vue";
import AdminList from "../views/admin/children/AdminList.vue";
const Info = () => import("../views/admin/children/Info.vue");
const Edit = () => import("../views/admin/children/Edit.vue");
const History = () => import("../views/admin/children/History.vue");
const NotFound = () => import("../views/NotFound.vue");

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "List",
  component: List
}, {
  path: '/login',
  name: "Login",
  component: Login
}, {
  path: '/admin',
  name: "Admin",
  component: Admin,
  children: [{
    path: '/admin',
    name: "AdminList",
    component: AdminList
  }, {
    path: '/admin/info',
    name: "Info",
    component: Info
  }, {
    path: '/admin/edit',
    name: "Edit",
    component: Edit
  }, {
    path: '/admin/history',
    name: "History",
    component: History
  }]
}, {
  path: '*',
  name: "NotFound",
  component: NotFound
}];

const router = new VueRouter({
  routes
});

/* import state from "./../store/state";

router.beforeEach((to, from, next) => {
  let path = to.path;
  if (path.includes("admin") && !state.admin.adminId) next("/login");
  else next();
});
 */

export default router;