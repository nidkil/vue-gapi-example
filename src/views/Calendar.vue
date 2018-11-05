<template>
  <v-layout
      column
  >
    <div v-if="googleCalendarApi">
      <v-flex xs6>
        <calendar-select
            :googleCalendarApi="googleCalendarApi"
            :calendarId="calendarId"
            @calendar-changed="calendarChanged"
        />
      </v-flex>
      <v-flex xs6>
        <calendar-events
            :googleCalendarApi="googleCalendarApi"
            :calendarId="calendarId"
        />
      </v-flex>
    </div>
    <v-container v-else>
      <v-flex xs6>
        Loading data...
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
import GoogleCalendarApi from "@/api/GoogleCalendarApi";
import { handlePromise } from "@/libs/common";
import CalendarSelect from "../components/CalendarSelect";
import CalendarEvents from "../components/CalendarEvents";

export default {
  name: "Calendar",
  data: () => ({
    googleCalendarApi: null,
    calendarId: localStorage.getItem("calendarId")
  }),
  methods: {
    async initGoogleCalendarApi() {
      let response = await handlePromise(this.$gapi.getGapiClient());
      if (response.success) {
        const client = response.data.client;
        this.googleCalendarApi = new GoogleCalendarApi(client);
      } else {
        // eslint-disable-next-line no-console
        console.error("Failed to get gapi client", response.err);
      }
    },
    calendarChanged(calendarId) {
      localStorage.setItem("calendarId", calendarId);
      this.calendarId = calendarId;
    }
  },
  async created() {
    if (!this.$gapi.isAuthenticated()) {
      const response = await handlePromise(this.$gapi.login());
      if (response.success) {
        await this.initGoogleCalendarApi();
      } else {
        // eslint-disable-next-line no-console
        console.error("Failed to login", response.err);
      }
    } else {
      await this.initGoogleCalendarApi();
    }
  },
  components: {
    CalendarSelect,
    CalendarEvents
  }
};
</script>
