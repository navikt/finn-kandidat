const path = require('path');
const express = require('express');
const app = express();

const BASE_PATH = '/finn-kandidat';
const LOCAL_APP = 'http://localhost:3000/finn-kandidat';
const LOCAL_LOGIN = `http://localhost:8080/finn-kandidat-api/local/isso-login?redirect=${LOCAL_APP}`;

const buildPath = path.join(__dirname, '../../build');

const startServer = () => {
    app.use(BASE_PATH, express.static(buildPath));

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.use(BASE_PATH, (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });

    app.get(`${BASE_PATH}/redirect-til-login`, (req, res) => {
        const loginUrl = process.env.LOGIN_URL || LOCAL_LOGIN;
        res.redirect(loginUrl);
    });

    app.listen(3000, () => {
        console.log('Server listening on port', 3000);
    });
};

startServer();
