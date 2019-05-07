import Kandidat from '../types/Kandidat';
import initialize from './initialize';

const api = initialize('/finn-kandidat-api');

const parseSistEndretDato = (kandidat: Kandidat) => {
    const sistEndret = kandidat.sistEndret ? new Date(kandidat.sistEndret) : undefined;

    return {
        ...kandidat,
        sistEndret,
    };
};

export const hentKandidater = async (): Promise<Kandidat[]> => {
    try {
        const respons = await api.get('/kandidater');
        return respons.data.map(parseSistEndretDato);
    } catch (error) {
        return Promise.reject(error.respons);
    }
};

export const postKandidat = async (kandidat: Kandidat): Promise<boolean> => {
    try {
        const respons = await api.post('/kandidater', kandidat);
        return respons.data;
    } catch (error) {
        return Promise.reject(error.respons);
    }
};

export const hentSkrivetilgang = async (fnr: string): Promise<boolean> => {
    try {
        const respons = await api.get(`/kandidater/${fnr}/skrivetilgang`);
        return respons.status === 200;
    } catch (error) {
        return Promise.reject(error.respons);
    }
};

export default api;
