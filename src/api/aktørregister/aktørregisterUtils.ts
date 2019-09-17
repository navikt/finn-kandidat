import { AxiosResponse } from 'axios';

export interface AktorIdResponse {
    [ident: string]: Identinfo;
}

export interface Identinfo {
    feilmelding: string | null;
    identer: Array<{
        gjeldende: boolean;
        ident: string;
        identgruppe: string;
    }> | null;
}

export const hentGjeldendeIdent = (
    ident: string,
    respons: AxiosResponse<AktorIdResponse>
): string | undefined => {
    if (respons) {
        const identinfo: Identinfo = respons.data[ident];
        if (identinfo && !identinfo.feilmelding && identinfo.identer) {
            const gjeldendeIdentinfo = identinfo.identer.find(ident => ident.gjeldende);
            if (gjeldendeIdentinfo) {
                return gjeldendeIdentinfo.ident;
            }
        }
    }
    return undefined;
};
