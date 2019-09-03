import { ArbeidstidBehov } from '../types/Behov';
import { Omit } from 'react-router';
import api from './initialize';
import { Kandidat } from '../types/Kandidat';
import { LovligeBehov } from '../pages/registrering/tilbakemelding/Tilbakemelding';
import { AxiosResponse } from 'axios';

type KandidatDto = Omit<Kandidat, 'arbeidstidBehov'> & {
    arbeidstidBehov: ArbeidstidBehov;
};

const fraKandidatDto = (kandidat: KandidatDto): Kandidat => {
    const sistEndret = kandidat.sistEndret ? new Date(kandidat.sistEndret) : undefined;
    const arbeidstidBehov = [kandidat.arbeidstidBehov];

    return {
        ...kandidat,
        sistEndret,
        arbeidstidBehov,
    };
};

const tilKandidatDto = (kandidat: Kandidat): KandidatDto => {
    const arbeidstidBehov = kandidat.arbeidstidBehov[0];

    return {
        ...kandidat,
        arbeidstidBehov,
    };
};

export const hentKandidat = async (aktørId: string): Promise<Kandidat> => {
    try {
        const respons = await api.get(`/kandidater/${aktørId}`);
        return fraKandidatDto(respons.data);
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const hentFnr = async (aktørId: string): Promise<AxiosResponse<string>> => {
    try {
        return await api.get(`/kandidater/${aktørId}/fnr`);
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const hentKandidater = async (): Promise<Kandidat[]> => {
    try {
        const respons = await api.get('/kandidater');
        return respons.data.map(fraKandidatDto);
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const opprettKandidat = async (kandidat: Kandidat): Promise<boolean> => {
    try {
        const respons = await api.post('/kandidater', tilKandidatDto(kandidat));
        return respons.data;
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const endreKandidat = async (kandidat: Kandidat): Promise<boolean> => {
    try {
        const respons = await api.put('/kandidater', tilKandidatDto(kandidat));
        return respons.data;
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const slettKandidat = async (aktørId: string): Promise<boolean> => {
    try {
        const respons = await api.delete(`/kandidater/${aktørId}`);
        return respons.status === 200;
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const hentSkrivetilgang = async (aktørId: string): Promise<boolean> => {
    try {
        await api.get(`/kandidater/${aktørId}/skrivetilgang`);
        return true;
    } catch (error) {
        return error.response.status === 403 ? false : Promise.reject(error.response);
    }
};

export const sendTilbakemelding = (tilbakemelding: string, behov: LovligeBehov) => {
    try {
        api.post('/tilbakemeldinger', {
            tilbakemelding,
            behov,
        });
    } catch (error) {}
};
