<template>
  <v-container>
    <v-layout
        column
    >
      <v-flex xs12 mb-2>
        Events
      </v-flex>
      <v-flex v-if="events" mb-4>
        <div v-for="(event, idx) in events" :key="idx">
          {{ event.summary }} ({{ when(event) }})
        </div>
      </v-flex>
      <v-flex v-else mb-4>
        No upcoming events found.
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "CalendarEvents",
  props: {
    googleCalendarApi: {
      type: Object,
      required: true
    },
    calendarId: {
      type: String,
      required: false,
      default: null
    }
  },
  data: () => ({
    events: null
  }),
  methods: {
    when(event) {
      return event.start.dateTime ? event.start.dateTime : event.start.date;
    },
    async retrieveEvents() {
      const calendar = this.googleCalendarApi;
      if (calendar) {
        try {
          const today = new Date();
          this.events = await calendar.retrieveEvents(this.calendarId, today);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("Failed to retrieve events", err);
        }
      }
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    calendarId: function(newVal, oldVal) {
      this.retrieveEvents();
    }
  },
  async created() {
    await this.retrieveEvents();
  }
};
</script>
