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

export const hentHelloWorld = async (): Promise<string> => {
    try {
        const response = await api.get('/hello-world');
        return response.data;
    } catch (error) {
        return 'Feil fra backend';
    }
};

export const hentKandidater = async (): Promise<Kandidat[]> => {
    try {
        const response = await api.get('/kandidater');
        return response.data.map(parseSistEndretDato);
    } catch (error) {
        return [];
    }
};

export const postKandidat = async (kandidat: Kandidat): Promise<boolean> => {
    try {
        const response = await api.post('/kandidater', kandidat);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export default api;
