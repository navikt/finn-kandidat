const CracoLessPlugin = require('craco-less');

const fs = require('fs');

const sendFilSomReturverdi = (path, res, contentType) => {
    const filnavn = require.resolve(path);
    fs.readFile(filnavn, 'utf8', (error, text) => {
        res.set('Content-Type', contentType);
        res.send(text);
    });
};

module.exports = {
    plugins: [{ plugin: CracoLessPlugin }],
    eslint: {
        enable: true,
        mode: 'extends',
        configure: {
            extends: 'react-app',
            rules: {
                // Det er en bug i denne sjekken som automatisk feiler på ÆØÅ: https://github.com/yannickcr/eslint-plugin-react/issues/1654
                'react/jsx-pascal-case': 'off',
            },
        },
    },
    devServer: {
        before: app => {
            app.get('/finn-kandidat/internmeny/v2/static/js/head.v2.min.js', (req, res) => {
                sendFilSomReturverdi('./src/mocking/internmeny.js', res, 'text/javascript');
            });
            app.get('/finn-kandidat/internmeny/v2/static/css/main.css', (req, res) => {
                sendFilSomReturverdi('./src/mocking/internmeny.css', res, 'text/css');
            });
            app.get("/finn-kandidat/static/js/envVariabler.js", (req, res) => {
                sendFilSomReturverdi('./src/mocking/envVariabler.js', res, 'text/javascript');
            })
        },
    },
};
