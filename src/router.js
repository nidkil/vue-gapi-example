import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Auth from "./views/Auth";
import Calendar from "./views/Calendar";
import PageNotFound from "./views/PageNotFound";

Vue.use(Router);

const mode = process.env.VUE_APP_ROUTER_MODE;

if (!mode) {
  throw new Error(
    "Has the .env.<env> file been setup? Environment variable not set: VUE_APP_ROUTER_MODE=" +
      mode
  );
}

export default new Router({
  mode,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/auth",
      name: "Auth",
      component: Auth
    },
    {
      path: "/calendar",
      name: "Calendar",
      component: Calendar
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "*",
      component: PageNotFound
    }
  ]
});
