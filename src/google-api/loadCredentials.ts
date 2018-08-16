const fs = require('fs');

const CREDENTIALS_PATH = './configs/credentials.json'

const loadCredentials = () => new Promise((resolve,reject) => {
    fs.readFile(CREDENTIALS_PATH, (err:Error, content:any) => {
        if (err) {
            return reject(err);
        }
        return resolve(JSON.parse(content));
    });
})

export default loadCredentials;