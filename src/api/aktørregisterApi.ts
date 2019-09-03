import axios, { AxiosResponse } from 'axios';
import { AktorIdResponse } from './aktørregisterUtils';
import { randomCallId } from '../utils/randomIdUtils';

const aktørIdUrl =
    '/finn-kandidat/aktoerregister/api/v1/identer?identgruppe=AktoerId&gjeldende=true';

// TODO: Rename
export const hentAktørIdDirekte = async (fnr: string): Promise<AxiosResponse<AktorIdResponse>> => {
    try {
        return await axios.get(aktørIdUrl, {
            withCredentials: true,
            headers: {
                'Nav-Consumer-Id': 'finn-kandidat',
                'Nav-Call-Id': randomCallId(),
                'Nav-Personidenter': fnr,
            },
        });
    } catch (error) {
        return Promise.reject(error.response);
    }
};

// TODO: hentFnr
