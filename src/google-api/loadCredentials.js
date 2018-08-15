const fs = require('fs');

const CREDENTIALS_PATH = './configs/credentials.json'

const loadCredentials = () => new Promise((resolve,reject) => {
    fs.readFile(CREDENTIALS_PATH, (err, content) => {
        if (err) {
            return reject(err);
        }
        return resolve(JSON.parse(content));
    });
})

export default loadCredentials;