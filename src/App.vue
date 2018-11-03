<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <router-link to="/" style="text-decoration:none; color: black">vue-gapi</router-link>
      </v-toolbar-title>
      <v-divider
          class="mx-3"
          inset
          vertical
      ></v-divider>
      <span class="subheading">Example</span>
      <v-spacer></v-spacer>
      <v-btn
          flat
          to="/auth"
      >
        <span class="mr-0">Auth</span>
      </v-btn>
      <v-btn
          flat
          to="/about"
      >
        <span class="mr-0">About</span>
      </v-btn>
      <v-menu
          offset-y
          transition="slide-y-transition"
      >
        <v-btn
          slot="activator"
          flat
          icon
        >
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <template v-for="(infoItem, index) in infoItems">
            <v-list-tile
                :key="index"
                :href="infoItem.link"
                target="_blank"
            >
              <v-list-tile-title>{{ infoItem.title }}</v-list-tile-title>
            </v-list-tile>
            <v-divider v-if="infoItem.divider" :key="index + 10"></v-divider>
          </template>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    // HelloWorld
  },
  data() {
    return {
      infoItems: [
        {
          title: "vue-gapi plugin",
          link: "https://github.com/cedpoilly/vue-gapi",
          divider: true
        },
        {
          title: "vue-gapi plugin extended",
          link: "https://github.com/nidkil/vue-gapi",
          divider: true
        },
        {
          title: "Google API Javascript Client",
          link:
            "https://developers.google.com/api-client-library/javascript/start/start-js"
        },
        {
          title: "Google Developer Console",
          link: "https://console.developers.google.com/"
        },
        {
          title: "Google Calendar API",
          link: "https://developers.google.com/calendar/",
          divider: true
        },
        {
          title: "Apps with access to your account",
          link: "https://myaccount.google.com/u/0/permissions"
        }
      ]
    };
  },
  created() {
    try {
      // NOTE: Google recommends 45 min refresh policy
      window.setInterval(this.$refreshToken(), 1000 * 60 * 45);
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
