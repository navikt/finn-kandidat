import MockAdapter from 'axios-mock-adapter';
import { Kandidat } from '../types/Kandidat';
import api from '../api/initialize';

const ROUTE_KANDIDATER = '/finn-kandidat-api/kandidater';
const ROUTE_EVENTS = '/finn-kandidat-api/events';
const ROUTE_TILBAKEMELDING = '/finn-kandidat-api/tilbakemeldinger';
const ROUTE_FNR = /\/finn-kandidat-api\/kandidater\/\d+/;
const ROUTE_SKRIVETILGANG = /\/finn-kandidat-api\/kandidater\/\d+\/skrivetilgang/;

const kandidater = require('./kandidater.json');
const mock = new MockAdapter(api, {
    delayResponse: 500,
});

const visAdvarsel = () => {
    const bigFontCss =
        'font-size: 3rem; font-weight: bold; font-family: georgia; color: skyblue; text-shadow: 1px 1px 0 black';
    const smallerFontCss = 'font-size: 1.075rem; color: skyblue; font-family: georgia;';

    console.log('%cMOCKED API', bigFontCss);
    console.log('%cDETTE SKAL IKKE VISES I PRODUKSJON!\n', smallerFontCss);
};

visAdvarsel();

const hentFnrFraConfig = (config: any) => config.url && config.url.split('/')[3];

mock.onGet(ROUTE_SKRIVETILGANG).reply(() => [200]);

mock.onGet(ROUTE_FNR).reply(config => {
    const fnrFraRoute = hentFnrFraConfig(config);
    const kandidatFraMock = kandidater.find((kandidat: Kandidat) => kandidat.fnr === fnrFraRoute);

    return kandidatFraMock ? [200, kandidatFraMock] : [404];
});

mock.onDelete(ROUTE_FNR).reply(config => {
    const fnrFraRoute = hentFnrFraConfig(config);
    const kandidatFraMock = kandidater.find((kandidat: Kandidat) => kandidat.fnr === fnrFraRoute);

    return kandidatFraMock ? [200] : [404];
});

mock.onGet(ROUTE_KANDIDATER).reply(() => [200, kandidater]);
mock.onPost(ROUTE_KANDIDATER).reply(config => [201, config.data]);
mock.onPut(ROUTE_KANDIDATER).reply(config => [200, config.data]);

mock.onPost(ROUTE_EVENTS).reply(config => {
    console.log('Sender event', config.data);
    return [200];
});

mock.onPost(ROUTE_TILBAKEMELDING).reply(() => [201]);
