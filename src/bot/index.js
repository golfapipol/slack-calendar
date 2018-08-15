import express from 'express';
import bodyParser from 'body-parser';
import request from 'request'
import {loadCredentials, authorize, listEvents} from '../google-api';

const clientId = 'PLACE_HERE'
const clientSecret = 'PLACE_HERE'
const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.get('/', (req, res) => {
    res.send("work!");
});

app.get('/oauth', (req, res) => {
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        request({
            url: 'https://slack.com/api/oauth.access', 
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, 
            method: 'GET', 
        }, (error, response, body) => {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }

})

app.post('/command', (req, res) => {
    return loadCredentials()
        .then(authorize)
        .then(listEvents)
        .then((events) => {
            res.send(events)
        })
})

const server = app.listen(PORT, () => {
    const {address, port} = server.address();
    console.info(`slack-calendar listening at http://${address}:${port}`)
  })
  