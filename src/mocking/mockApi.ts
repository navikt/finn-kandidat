import MockAdapter from 'axios-mock-adapter';
import { Kandidat } from '../types/Kandidat';
import api from '../api/initialize';

const ROUTE_KANDIDATER = '/finn-kandidat-api/kandidater';
const ROUTE_EVENTS = '/finn-kandidat-api/events';
const ROUTE_TILBAKEMELDING = '/finn-kandidat-api/tilbakemeldinger';
const ROUTE_VEILEDER_ME = '/finn-kandidat-api/veileder/me';
const ROUTE_KANDIDAT = /\/finn-kandidat-api\/kandidater\/\d+/;
const ROUTE_SKRIVETILGANG = /\/finn-kandidat-api\/kandidater\/\d+\/skrivetilgang/;
const ROUTE_AKTØRID = /\/finn-kandidat-api\/kandidater\/\d+\/aktorId/;
const ROUTE_FNR = /\/finn-kandidat-api\/kandidater\/\d+\/fnr/;

const kandidater: Kandidat[] = require('./kandidater.json');
const mock = new MockAdapter(api, {
    delayResponse: 200,
});

export const FØRSTE_KANDIDAT = kandidater[0];

const innloggetVeileder = FØRSTE_KANDIDAT.sistEndretAv;

const visAdvarsel = () => {
    const bigFontCss =
        'font-size: 3rem; font-weight: bold; font-family: georgia; color: skyblue; text-shadow: 1px 1px 0 black';
    const smallerFontCss = 'font-size: 1.075rem; color: skyblue; font-family: georgia;';

    console.log('%cMOCKED API', bigFontCss);
    console.log('%cDETTE SKAL IKKE VISES I PRODUKSJON!\n', smallerFontCss);
};

visAdvarsel();

mock.onGet(ROUTE_SKRIVETILGANG).reply(() => [200]);

mock.onGet(ROUTE_VEILEDER_ME).reply(() => [200, innloggetVeileder]);

mock.onGet(ROUTE_AKTØRID).reply(config => {
    const fnrFraRoute = hentFnrFraConfig(config);
    const kandidatFraMock = kandidater.find((kandidat: Kandidat) => kandidat.fnr === fnrFraRoute)!;

    return [200, kandidatFraMock!.aktørId];
});

mock.onGet(ROUTE_FNR).reply(config => {
    const aktørIdFraRoute = hentAktørIdFraConfig(config);
    const kandidatFraMock = kandidater.find(
        (kandidat: Kandidat) => kandidat.aktørId === aktørIdFraRoute
    );

    return [200, kandidatFraMock!.fnr];
});

mock.onGet(ROUTE_KANDIDAT).reply(config => {
    const aktørIdFraUrl = hentAktørIdFraConfig(config);
    const kandidatFraMock = kandidater.find(
        (kandidat: Kandidat) => kandidat.aktørId === aktørIdFraUrl
    );

    return kandidatFraMock ? [200, kandidatFraMock] : [404];
});

mock.onDelete(ROUTE_KANDIDAT).reply(config => {
    const aktørIdFraRoute = hentAktørIdFraConfig(config);
    const kandidatFraMock = kandidater.find(
        (kandidat: Kandidat) => kandidat.aktørId === aktørIdFraRoute
    );

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

const hentFnrFraConfig = (config: any) => config.url && config.url.split('/')[3];
const hentAktørIdFraConfig = (config: any) => config.url && config.url.split('/')[3];
