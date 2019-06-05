import Kandidat from '../types/Kandidat';
import api from './initialize';

const parseSistEndretDato = (kandidat: Kandidat) => {
    const sistEndret = kandidat.sistEndret ? new Date(kandidat.sistEndret) : undefined;

    return {
        ...kandidat,
        sistEndret,
    };
};

export const hentKandidat = async (fnr: string): Promise<Kandidat> => {
    try {
        const respons = await api.get(`/kandidater/${fnr}`);
        return parseSistEndretDato(respons.data);
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const hentKandidater = async (): Promise<Kandidat[]> => {
    try {
        const respons = await api.get('/kandidater');
        return respons.data.map(parseSistEndretDato);
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const opprettKandidat = async (kandidat: Kandidat): Promise<boolean> => {
    try {
        const respons = await api.post('/kandidater', kandidat);
        return respons.data;
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const endreKandidat = async (kandidat: Kandidat): Promise<boolean> => {
    try {
        const respons = await api.put('/kandidater', kandidat);
        return respons.data;
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const slettKandidat = async (fnr: string): Promise<boolean> => {
    try {
        const respons = await api.delete(`/kandidater/${fnr}`);
        return respons.status === 200;
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const hentSkrivetilgang = async (fnr: string): Promise<boolean> => {
    try {
        await api.get(`/kandidater/${fnr}/skrivetilgang`);
        return true;
    } catch (error) {
        return error.response.status === 403 ? false : Promise.reject(error.response);
    }
};
