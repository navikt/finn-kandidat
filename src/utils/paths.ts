export const APP_ROOT = '/finn-kandidat';

export enum AppRoute {
    Forside = '/',
    Oversikt = '/oversikt',
    Registrering = '/registrering',
    SeKandidat = '/kandidat/:fnr',
    EndreKandidat = '/kandidat/:fnr/endre',
    FørDuBegynner = '/for-du-begynner',
}

export interface MatchProps {
    fnr: string;
}

export const hentRoute = (route: AppRoute, fødselsnummer?: string) => {
    return fødselsnummer ? route.replace(':fnr', fødselsnummer) : route;
};
