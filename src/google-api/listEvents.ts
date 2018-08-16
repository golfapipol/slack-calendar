const {google} = require('googleapis');

const listEvents = (auth:any) => new Promise((resolve, reject) => {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'shuhari@scrum123.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err:Error, res:any) => {
    if (err) return reject('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      return resolve(events.map((event:any, i:Number) => {
        const start = event.start.dateTime || event.start.date;
        console.log("event:", event)
        return `${start} - ${event.summary}`;
      }).join("\n"))
    } else {
      return resolve('No upcoming events found.');
    }
  });
});

export default listEvents;