import { AxiosResponse } from 'axios';

export interface AktorIdResponse {
    [fnr: string]: Identinfo;
}

export interface Identinfo {
    feilmelding: string | null;
    identer: Array<{
        gjeldende: boolean;
        ident: string;
        identgruppe: string;
    }> | null;
}

export const hentGjeldendeAktørId = (
    fnr: string,
    respons: AxiosResponse<AktorIdResponse>
): string | undefined => {
    if (respons) {
        const identinfo: Identinfo = respons.data[fnr];
        if (identinfo && !identinfo.feilmelding && identinfo.identer) {
            const gjeldendeIdentinfo = identinfo.identer.find(ident => ident.gjeldende);
            if (gjeldendeIdentinfo) {
                return gjeldendeIdentinfo.ident;
            }
        }
    }
    return undefined;
};
