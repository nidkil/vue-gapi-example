import Vue from "vue";
import VueGAPI from "vue-gapi";

// See all available scopes here: https://developers.google.com/identity/protocols/googlescopes"
const apiConfig = {
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ],
  scope: "https://www.googleapis.com/auth/calendar"
};

if (process.env.NODE_ENV === "development") {
  console.log("apiConfig", apiConfig);
}

Vue.use(VueGAPI, apiConfig);
