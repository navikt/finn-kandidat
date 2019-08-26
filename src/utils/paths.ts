export const APP_ROOT = '/finn-kandidat';

export enum AppRoute {
    Forside = '/',
    Oversikt = '/oversikt',
    Registrering = '/registrering/:aktorId',
    SeKandidat = '/kandidat/:aktorId',
    EndreKandidat = '/kandidat/:aktorId/endre',
    FørDuBegynner = '/for-du-begynner',
}

export interface MatchProps {
    // Må bruke o siden æøå ikke er støttet i react-router
    aktorId: string;
}

export const hentRoute = (route: AppRoute, aktørId?: string) => {
    return aktørId ? route.replace(':aktorId', aktørId) : route;
};
