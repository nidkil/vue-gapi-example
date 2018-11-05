import { handlePromise } from "@/libs/common";

export default class GoogleCalendarApi {
  constructor(gapiClient) {
    if (!gapiClient) {
      throw new Error("gapi client not initialized");
    }
    this.gapiClient = gapiClient;
  }

  async retrieveCalendars(maxResults = 10, showDeleted = false) {
    const calendar = this.gapiClient.calendar;
    const response = await handlePromise(
      calendar.calendarList.list({
        maxResults,
        showDeleted
      })
    );
    if (response.success) {
      return response.data.result.items;
    } else {
      throw new Error("Failed to retrieve calendars: " + response.err.message);
    }
  }

  async retrieveEvents(calendarId, dt, maxResults = 10, showDeleted = false) {
    const calendar = this.gapiClient.calendar;
    const response = await handlePromise(
      calendar.events.list({
        calendarId,
        timeMin: dt.toISOString(),
        showDeleted,
        singleEvents: true,
        maxResults,
        orderBy: "startTime"
      })
    );
    if (response.success) {
      return response.data.result.items;
    } else {
      throw new Error("Failed to retrieve events: " + response.err.message);
    }
  }
}
