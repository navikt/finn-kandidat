import { Kandidat } from '../types/Kandidat';

const kandidater = require('./kandidater.json');

export const kandidatFraMock = (aktørId: string) => {
    return kandidater.find((kandidat: Kandidat) => kandidat.aktørId === aktørId);
};

export const hentFnrFraConfig = (config: any) => config.url && config.url.split('/')[3];
export const aktørIdFraUrl = (config: any) => config.url && config.url.split('/')[3];

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

export const visAdvarsel = () => {
    const bigFontCss =
        'font-size: 3rem; font-weight: bold; font-family: georgia; color: skyblue; text-shadow: 1px 1px 0 black';
    const smallerFontCss = 'font-size: 1.075rem; color: skyblue; font-family: georgia;';

    console.log('%cMOCKED API', bigFontCss);
    console.log('%cDETTE SKAL IKKE VISES I PRODUKSJON!\n', smallerFontCss);
};
