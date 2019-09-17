import { AxiosResponse } from 'axios';
import uuid from 'uuid';
import { AktorIdResponse } from './aktørregisterUtils';
import environment from '../../utils/environment';
import { aktørregisterApi } from './initialiserAktørregisterApi';

export const aktørIdUrl = `${environment.AKTORREGISTER_URL}/identer?identgruppe=AktoerId&gjeldende=true`;
export const fnrUrl = `${environment.AKTORREGISTER_URL}/identer?identgruppe=NorskIdent&gjeldende=true`;

export const hentAktørId = async (fnr: string): Promise<AxiosResponse<AktorIdResponse>> => {
    return await aktørregisterApi.get(aktørIdUrl, {
        headers: lagHeaders(fnr),
    });
};

export const hentFnr = async (aktørId: string): Promise<AxiosResponse<AktorIdResponse>> => {
    return await aktørregisterApi.get(fnrUrl, {
        headers: lagHeaders(aktørId),
    });
};

const lagHeaders = (ident: string) => {
    return {
        'Nav-Consumer-Id': 'finn-kandidat',
        'Nav-Call-Id': uuid.v1(),
        'Nav-Personidenter': ident,
    };
};
