import axios, { AxiosResponse } from 'axios';
import { AktorIdResponse } from './aktørregisterUtils';
import { randomCallId } from '../utils/randomIdUtils';

const aktørIdUrl =
    '/finn-kandidat/aktoerregister/api/v1/identer?identgruppe=AktoerId&gjeldende=true';

const fnrUrl = '/finn-kandidat/aktoerregister/api/v1/identer?identgruppe=NorskIdent&gjeldende=true';

export const hentAktørId = async (fnr: string): Promise<AxiosResponse<AktorIdResponse>> => {
    return await axios.get(aktørIdUrl, {
        withCredentials: true,
        headers: lagHeaders(fnr),
    });
};

export const hentFnr = async (aktørId: string): Promise<AxiosResponse<AktorIdResponse>> => {
    return await axios.get(fnrUrl, {
        withCredentials: true,
        headers: lagHeaders(aktørId),
    });
};

const lagHeaders = (ident: string) => {
    return {
        'Nav-Consumer-Id': 'finn-kandidat',
        'Nav-Call-Id': randomCallId(),
        'Nav-Personidenter': ident,
    };
};
