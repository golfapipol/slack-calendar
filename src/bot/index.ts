import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'request';
import {authorize,listEvents,loadCredentials} from '../google-api';

const clientId = '17914679652.417117531106';
const clientSecret = '0321bba90e0f88fbedd060e07ce955c0';
const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.get('/', (req:any, res:any) => {
    res.send("work!");
});

app.get('/oauth', (req:any, res:any) => {
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        const options = {
            url: 'https://slack.com/api/oauth.access', 
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, 
            method: 'GET', 
        }
        request(options, (error:Error, response:any, body:any) => {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }

})

app.post('/command', (req:any, res:any) => {
    return loadCredentials()
        .then(authorize)
        .then(listEvents)
        .then((events:any) => {
            res.send(events)
        })
})

const server = app.listen(PORT, () => {
    const {address, port} = server.address();
    console.info(`slack-calendar listening at http://${address}:${port}`)
  })
  