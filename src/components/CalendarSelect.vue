<template>
  <v-container>
    <div v-if="calendars">
      <v-select
          v-model="selectedCalendarId"
          label="Select calendar"
          :items="calendars"
          item-value="id"
          item-text="name"
          @change="calendarChanged"
          single-line
      />
    </div>
    <div v-else>
      No calendars found.
    </div>
  </v-container>
</template>

<script>
export default {
  name: "CalendarList",
  props: {
    googleCalendarApi: {
      type: Object,
      required: true
    },
    calendarId: {
      type: String,
      required: false,
      default: "primary"
    }
  },
  data: () => ({
    selectedCalendarId: null,
    calendars: null
  }),
  methods: {
    async retrieveCalendars() {
      const calendar = this.googleCalendarApi;
      if (calendar) {
        try {
          const items = await calendar.retrieveCalendars();
          let calendars = [];
          let primaryId = null;
          items.forEach(item => {
            let name = item.summary + (item.primary ? " (primary)" : "");
            calendars.push({
              id: item.id,
              name,
              primary: item.primary
            });
            if (item.primary) primaryId = item.id;
          });
          this.selectedCalendarId = this.calendarId || primaryId;
          this.calendars = calendars;
          // If we do not have a calendarId we need to emit an event to retrieve the calendar events
          if (!this.calendarId) this.calendarChanged();
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("Failed to retrieve calendars", err);
        }
      }
    },
    calendarChanged() {
      this.$emit("calendar-changed", this.selectedCalendarId);
    }
  },
  async created() {
    this.selectedCalendarId = this.calendarId;
    await this.retrieveCalendars();
  }
};
</script>
