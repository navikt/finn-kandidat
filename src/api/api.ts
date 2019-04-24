import { isDevelopment } from '../utils/environment';
import { APP_ROOT } from '../utils/paths';
import Kandidat from '../types/Kandidat';
import Arbeidssituasjon from '../types/Arbeidssituasjon';

const API_BASE_URL = '/finn-kandidat-api';
const API_LOGIN = `${APP_ROOT}/redirect-til-login`;
const LOCAL_LOGIN = `http://localhost:8080/finn-kandidat-api/local/isso-login?redirect=http://localhost:3000/${APP_ROOT}`;

const redirectToLogin = () => {
    window.location.href = isDevelopment() ? LOCAL_LOGIN : API_LOGIN;
};

const redirectUnauthorized = (status: number) => {
    if (status === 401) {
        redirectToLogin();
    }
};

export const hentHelloWorld = async (): Promise<string> => {
    const respons = await fetch(`${API_BASE_URL}/hello-world`);

    redirectUnauthorized(respons.status);

    if (respons.ok) {
        return await respons.text();
    } else {
        return 'Feil fra backend';
    }
};

export const hentKandidater = (): Promise<Kandidat[]> => {
    const kandidater: Kandidat[] = ['12125012345', '12125012346', '12125012347'].map(fnr => ({
        fnr,
        fysiskTilrettelegging: [],
        arbeidssituasjon: Arbeidssituasjon.IKKE_VALGT,
        sistEndretAv: 'MD57773',
        sistEndret: new Date(),
    }));

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(kandidater);
        }, 300);
    });
};

export const postKandidat = async (kandidat: Kandidat): Promise<boolean> =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 300);
    });
