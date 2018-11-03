<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex
        mb-5
        xs12
      >
        <h2 class="headline font-weight-bold mb-3">Google Authentication</h2>

        <v-layout justify-center>
          <v-btn
              flat
              @click="getOfflineAccessCode"
          >
            <span class="mr-0">Offline access code</span>
          </v-btn>
          <v-btn
              flat
              :disabled="authenticated"
              @click="login"
          >
            <span class="mr-0">Login</span>
          </v-btn>
          <v-btn
              flat
              :disabled="!authenticated"
              @click="logout"
          >
            <span class="mr-0">Logout</span>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex mb-5 xs12>
        <v-subheader>User data</v-subheader>
        <div v-if="userData">
          <v-expansion-panel>
            <v-expansion-panel-content>
              <v-layout
                  slot="header"
                  align-center
                  row
                  spacer
              >
                <v-flex xs4 sm2 md1>
                  <v-avatar
                      slot="activator"
                      size="36px"
                  >
                    <img
                        :src="userData.imageUrl"
                        alt="User's photo"
                    >
                  </v-avatar>
                </v-flex>

                <v-flex sm5 md3 hidden-xs-only>
                  <strong v-html="userData.fullName"></strong>
                </v-flex>

                <v-flex no-wrap xs5 sm3>
                  {{ userData.lastName }},
                  <strong>{{ userData.firstName }}</strong>
                </v-flex>

                <v-flex
                    class="grey--text"
                    ellipsis
                    hidden-sm-and-down
                >
                  {{ userData.email }}
                </v-flex>
              </v-layout>

              <v-card>
                <v-divider></v-divider>
                <v-card-text>
                  <v-layout
                      align-center
                      row
                      spacer
                      v-for="(item, idx) in otherItems"
                      :key="idx"
                  >
                    <v-flex no-wrap sm4 md2>
                      {{ item }}:
                    </v-flex>
                    <v-flex
                        no-wrap sm8 md10
                        ellipsis
                        hidden-sm-and-down
                    >
                      <v-tooltip bottom>
                      <span slot="activator">
                        <strong>{{ item === 'expiresAt' ? convertEpochToDateTime(userData[item]) : userData[item] }}</strong>
                      </span>
                        <span>{{ userData[item] }}</span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </div>
        <div v-else>
          <v-list class="elevation-1">
            <v-list-tile>
              <v-list-tile-content class="body-1">
                N/A
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>
      </v-flex>
      <v-flex
          v-if="offlineAccessCode"
          mb-5
          xs12
      >
        <v-subheader>Offline access code</v-subheader>
        <v-list class="elevation-1">
          <v-list-tile>
            <v-list-tile-content class="body-1">
              {{ offlineAccessCode }}
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple @click="doCopy" :disabled="offlineAccessCode === 'N/A'">
                <img :src="require('@/assets/content_copy_48px.svg')" width="18" />
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  name: "GoogleAuth",
  data: () => ({
    authenticated: false,
    userData: null,
    offlineAccessCode: 'N/A',
    otherItems: ["id", "expiresAt", "accessToken", "idToken"]
  }),
  methods: {
    convertEpochToDateTime(epoch) {
      const dt = moment().utc(epoch).local();
      return dt.format("ddd, D MMM YYYY, hh:mm:ss");
    },
    doCopy() {
      this.$copyText(this.offlineAccessCode);
    },
    login() {
      if (!this.$gapi.isAuthenticated()) {
        this.$gapi.login()
          .then(() => {
            console.log("Successfully authenticated");
            this.authenticated = true;
            this.userData = this.$getUserData();
          })
          .catch(err => {
            console.error("Login call failed: %s", err.message);
          });
      }
    },
    getOfflineAccessCode() {
      this.$gapi.grantOfflineAccess()
        .then(() => {
          console.log("Successfully retrieved offline access token");
          this.offlineAccessCode = this.$gapi.getOfflineAccessCode();
        })
        .catch(err => {
          console.error("Offline access code call failed: %s", err.message);
        });
    },
    logout() {
      if (this.$isAuthenticated()) {
        this.$gapi.logout()
          .then(() => {
            console.log("Successfully logged out");
            this.authenticated = false;
            this.userData = null;
          })
          .catch(err => {
            console.error("Logout call failed: %s", err.message);
          });
      }
    }
  },
  created() {
    this.authenticated = this.$gapi.isAuthenticated();
    if (this.$gapi.isAuthenticated()) this.userData = this.$gapi.getUserData();
  }
};
</script>
