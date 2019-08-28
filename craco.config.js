const CracoLessPlugin = require('craco-less');

const fs = require('fs');

const lesFilSomTekst = (path, callback) => {
    const filnavn = require.resolve(path);
    fs.readFile(filnavn, 'utf8', callback);
};

/*
lesFilSomTekst('./test.txt', (error, text) => {
    internmenyJsMock = text;
});
*/

const sendFilSomReturverdi = (filnavn, res) => {
    lesFilSomTekst(filnavn, (error, text) => {
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
        proxy: {
            '/finn-kandidat/decorator/v2/static/js/head.v2.min.js': {
                target: 'http://localhost:8080',
                pathRewrite: {'^/ditt-nav-arbeidsgiver/api' : '/ditt-nav-arbeidsgiver-api/api'}
            }
        },
        before: (app) => {
            app.get('/finn-kandidat/decorator/v2/static/js/head.v2.min.js', (req, res) => {
                sendFilSomReturverdi('./src/mocking/internmeny.js', res);
            });
        }
    },
};
