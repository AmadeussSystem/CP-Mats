import { calendarCreateNoteButton } from './calendar_create_note_button.js'

export class IcsTable {
  constructor(parent, date = new Date()) {
    this.parent = parent;
    this.date = date;
  }

  async icsPlugin() {
    return await app.plugins.getPlugin('ics');
  }

  async events() {
    const ics = await this.icsPlugin();
    return await ics.getEvents(this.date);
  }

  async content() {
    const headers = ['summary', 'time', 'location', 'attendees', ''];
    const currentEvents = await this.events();

    const rows = currentEvents.map(event => {
      const time = `${event.time} to ${event.endTime}`;
      const attendees = event.attendees.map(a => `${a.name}: ${a.status}`);
      const createButton = calendarCreateNoteButton(this.parent, event);

      return [event.summary, time, event.location, attendees, createButton];
    });

    return { headers, rows };
  }

  /**
   * Render the ICS table directly into a container element.
   * Used by js-engine code blocks (no Dataview dependency).
   */
  async render(containerEl) {
    const currentEvents = await this.events();

    if (currentEvents.length === 0) {
      containerEl.createEl('p', { text: 'No meetings scheduled.' });
      return;
    }

    const table = containerEl.createEl('table');
    const thead = table.createEl('thead');
    const headerRow = thead.createEl('tr');

    ['Summary', 'Time', 'Location', 'Attendees', ''].forEach(h => {
      headerRow.createEl('th', { text: h });
    });

    const tbody = table.createEl('tbody');

    for (const event of currentEvents) {
      const row = tbody.createEl('tr');

      // Summary
      row.createEl('td', { text: event.summary });

      // Time
      row.createEl('td', { text: `${event.time} to ${event.endTime}` });

      // Location
      row.createEl('td', { text: event.location || '' });

      // Attendees
      const attendeeTd = row.createEl('td');
      if (event.attendees && event.attendees.length > 0) {
        const ul = attendeeTd.createEl('ul');
        event.attendees.forEach(a => {
          ul.createEl('li', { text: `${a.name}: ${a.status}` });
        });
      }

      // Button
      const buttonTd = row.createEl('td');
      calendarCreateNoteButton({ container: buttonTd }, event);
    }
  }
}
