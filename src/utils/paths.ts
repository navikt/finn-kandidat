// eslint tror ikke at match er brukt
import { match } from 'react-router-dom'; // eslint-disable-line
import { matchPath } from 'react-router-dom';

export const APP_ROOT = '/finn-kandidat';

export enum AppRoute {
    Forside = '/',
    Oversikt = '/oversikt',
    Registrering = '/registrering/:aktorId',
    SeKandidat = '/kandidat/:aktorId',
    EndreKandidat = '/kandidat/:aktorId/endre',
    FørDuBegynner = '/for-du-begynner',
}

export const hentRoute = (route: AppRoute, aktørId?: string) => {
    return aktørId ? route.replace(':aktorId', aktørId) : route;
};

export interface MatchProps {
    // Må bruke o siden æøå ikke er støttet i react-router
    aktorId: string;
}

export const aktørIdFraUrl = (pathname: string): string | undefined => {
    const match: match<MatchProps> | null = matchPath(pathname, {
        path: [AppRoute.Registrering, AppRoute.SeKandidat, AppRoute.EndreKandidat],
        exact: false,
    });

    if (match) {
        return match.params.aktorId;
    } else {
        return undefined;
    }
};
