import { AxiosResponse } from 'axios';

import { ArbeidsmijøBehov, ArbeidstidBehov, FysiskBehov, GrunnleggendeBehov } from '../types/Behov';
import { Kandidat } from '../types/Kandidat';
import { LovligeBehov } from '../pages/registrering/tilbakemelding/Tilbakemelding';
import api from './initialize';

export interface KandidatTilApi {
    aktørId: string;
    arbeidstidBehov: ArbeidstidBehov[];
    fysiskeBehov: FysiskBehov[];
    arbeidsmiljøBehov: ArbeidsmijøBehov[];
    grunnleggendeBehov: GrunnleggendeBehov[];
}

interface KandidatFraApi {
    aktørId: string;
    fnr: string;
    sistEndret: string;
    sistEndretAv: string;
    navKontor: string | null;
    arbeidstidBehov: ArbeidstidBehov;
    fysiskeBehov: FysiskBehov[];
    arbeidsmiljøBehov: ArbeidsmijøBehov[];
    grunnleggendeBehov: GrunnleggendeBehov[];
}

const konverterKandidatFraApi = (kandidat: KandidatFraApi): Kandidat => {
    const sistEndret = new Date(kandidat.sistEndret);
    const arbeidstidBehov = [kandidat.arbeidstidBehov];
    const navKontor = kandidat.navKontor || undefined;
    return {
        ...kandidat,
        sistEndret,
        navKontor,
        arbeidstidBehov,
    };
};

export const konverterKandidatTilApi = (kandidat: Kandidat): KandidatTilApi => {
    return {
        aktørId: kandidat.aktørId,
        arbeidstidBehov: kandidat.arbeidstidBehov,
        fysiskeBehov: kandidat.fysiskeBehov,
        arbeidsmiljøBehov: kandidat.arbeidsmiljøBehov,
        grunnleggendeBehov: kandidat.grunnleggendeBehov,
    };
};

export const hentInnloggetVeileder = async (): Promise<string> => {
    try {
        const respons = await api.get(`/veileder/me`);
        return respons.data;
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const hentKandidat = async (aktørId: string): Promise<Kandidat> => {
    try {
        const respons = await api.get(`/kandidater/${aktørId}`);
        return konverterKandidatFraApi(respons.data);
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const hentAktørId = async (fnr: string): Promise<string> => {
    try {
        const respons = await api.get(`/kandidater/${fnr}/aktorId`);
        return respons.data;
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
        return respons.data.map(konverterKandidatFraApi);
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const opprettKandidat = async (kandidat: KandidatTilApi): Promise<boolean> => {
    try {
        const respons = await api.post('/kandidater', kandidat);
        return respons.data;
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const endreKandidat = async (kandidat: KandidatTilApi): Promise<boolean> => {
    try {
        const respons = await api.put('/kandidater', kandidat);
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
