const path = require('path');
const express = require('express');
const app = express();
const createEnvSettingsFile = require('./envVariabler.js');
const proxy = require('http-proxy-middleware');

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const BASE_PATH = '/finn-kandidat';
const INTERNMENY_PATH = `${BASE_PATH}/internmeny`;
const LOCAL_APP = `http://localhost:${PORT}/finn-kandidat`;
const LOCAL_LOGIN = `http://localhost:8080/finn-kandidat-api/local/isso-login?redirect=${LOCAL_APP}`;

const buildPath = path.join(__dirname, '../../build');

createEnvSettingsFile(path.resolve(`${buildPath}/static/js/envVariabler.js`));

const startServer = () => {
    app.use(BASE_PATH, express.static(buildPath));

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/redirect-til-login`, (req, res) => {
        const loginUrl = process.env.LOGIN_URL || LOCAL_LOGIN;
        res.redirect(loginUrl);
    });

    app.use(
        proxy(INTERNMENY_PATH, {
            target: process.env.INTERNMENY_URL,
            changeOrigin: true,
            pathRewrite: (path, req) => path.replace(INTERNMENY_PATH, ''),
        })
    );

    app.use(BASE_PATH, (_, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });

    app.use('/', (_, res) => {
        res.redirect(BASE_PATH);
    });

    app.listen(PORT, () => {
        console.log('Server listening on port', PORT);
    });
};

startServer();
