import Vue from "vue";
import Vuetify from "vuetify/lib";
import {
  VApp, // required
  VNavigationDrawer,
  VFooter,
  VToolbar
} from "vuetify/lib";
import "@/stylus/main.styl";

Vue.use(Vuetify, {
  iconfont: "md",
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar
  },
  theme: {
    primary: "#EBB94F",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  }
});
