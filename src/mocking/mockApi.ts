import MockAdapter from 'axios-mock-adapter';
import { Kandidat } from '../types/Kandidat';
import {
    aktørIdFraUrl,
    kandidatFraMock,
    ingenIdenterRespons,
    visAdvarsel,
    aktørIdRespons,
    fnrRespons,
} from './mockUtils';
import api from '../api/initialize';
import axios from 'axios';
const kandidater = require('./kandidater.json');

const kandidaterUrl = '/finn-kandidat-api/kandidater';
const eventsUrl = '/finn-kandidat-api/events';
const tilbakemeldingerUrl = '/finn-kandidat-api/tilbakemeldinger';
const kandidatUrl = /\/finn-kandidat-api\/kandidater\/\d+/;
const skrivetilgangUrl = /\/finn-kandidat-api\/kandidater\/\d+\/skrivetilgang/;
const hentAktørIdUrl =
    '/finn-kandidat/aktoerregister/api/v1/identer?identgruppe=AktoerId&gjeldende=true';
const hentFnrUrl =
    '/finn-kandidat/aktoerregister/api/v1/identer?identgruppe=NorskIdent&gjeldende=true';

const finnKandidatMock = new MockAdapter(api, { delayResponse: 200 });
const aktørregisterMock = new MockAdapter(axios, { delayResponse: 200 });

finnKandidatMock.onGet(kandidatUrl).reply(config => {
    const aktørId = aktørIdFraUrl(config);
    const kandidat = kandidatFraMock(aktørId);
    return kandidat ? [200, kandidat] : [404];
});

finnKandidatMock.onDelete(kandidatUrl).reply(config => {
    const aktørId = aktørIdFraUrl(config);
    const kandidat = kandidatFraMock(aktørId);
    return kandidat ? [200] : [404];
});

finnKandidatMock.onGet(kandidaterUrl).reply(200, kandidater);
finnKandidatMock.onPost(kandidaterUrl).reply(config => [201, config.data]);
finnKandidatMock.onPut(kandidaterUrl).reply(config => [200, config.data]);
finnKandidatMock.onGet(skrivetilgangUrl).reply(200);
finnKandidatMock.onPost(tilbakemeldingerUrl).reply(201);
finnKandidatMock.onPost(eventsUrl).reply(config => {
    console.log('Sender event', config.data);
    return [200];
});

aktørregisterMock.onGet(hentAktørIdUrl).reply(config => {
    const fnr = config.headers['Nav-Personidenter'];
    const kandidat: Kandidat = kandidater.find((kandidat: Kandidat) => kandidat.fnr === fnr);
    if (kandidat) {
        return [200, aktørIdRespons(fnr, kandidat.aktørId)];
    } else {
        return [200, ingenIdenterRespons(fnr)];
    }
});

aktørregisterMock.onGet(hentFnrUrl).reply(config => {
    const aktørId = config.headers['Nav-Personidenter'];
    const kandidat = kandidatFraMock(aktørId);
    if (kandidat) {
        return [200, fnrRespons(aktørId, kandidat.fnr)];
    } else {
        return [200, ingenIdenterRespons(aktørId)];
    }
});

visAdvarsel();
