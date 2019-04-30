import MockAdapter from 'axios-mock-adapter';
import api from '../api/api';

const visAdvarsel = () => {
    const bigFontCss =
        'font-size: 3rem; font-weight: bold; font-family: georgia; color: skyblue; text-shadow: 1px 1px 0 black';
    const smallerFontCss = 'font-size: 1.075rem; color: skyblue; font-family: georgia;';

    console.log('%cMOCKED API', bigFontCss);
    console.log('%cDETTE SKAL IKKE VISES I PRODUKSJON!\n', smallerFontCss);
};

visAdvarsel();

const kandidater = require('./kandidater.json');

const mock = new MockAdapter(api, {
    delayResponse: 300,
});

mock.onGet('/finn-kandidat-api/kandidater')
    .reply(() => [200, kandidater])
    .onPost('/finn-kandidat-api/kandidater')
    .reply(config => [200, config.data]);
