const {google} = require('googleapis');

const listEvents = (auth) => new Promise((resolve, reject) => {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'shuhari@scrum123.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return reject('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      return resolve(events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        return `${start} - ${event.summary}`;
      }).join("\n"))
    } else {
      return resolve('No upcoming events found.');
    }
  });
});

export default listEvents;