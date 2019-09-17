import { Kandidat } from '../types/Kandidat';

const kandidater = require('./kandidater.json');

export const kandidatFraMock = (aktørId: string) => {
    return kandidater.find((kandidat: Kandidat) => kandidat.aktørId === aktørId);
};

export const aktørIdRespons = (fnr: string, aktørId: string) => ({
    [fnr]: {
        identer: [{ ident: aktørId, identgruppe: 'AktoerId', gjeldende: true }],
        feilmelding: null,
    },
});

export const fnrRespons = (aktørId: string, fnr: string) => ({
    [aktørId]: {
        identer: [{ ident: fnr, identgruppe: 'NorskIdent', gjeldende: true }],
        feilmelding: null,
    },
});

export const ingenIdenterRespons = (ident: string) => ({
    [ident]: { identer: null, feilmelding: 'Den angitte personidenten finnes ikke' },
});
