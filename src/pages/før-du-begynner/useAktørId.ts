import { useCallback, useEffect, useState } from 'react';
import { hentKandidat, hentSkrivetilgang } from '../../api/finnKandidatApi';
import { hentGjeldendeIdent } from '../../api/aktørregisterUtils';
import { erGyldigFnr, erTom } from './fnr-input/fnrUtils';
import { hentAktørId as hentAktørIdFraApi } from '../../api/aktørregisterApi';

export enum Feilmelding {
    TomtFødselsnummer = 'Vennligst fyll ut fødselsnummer',
    UgyldigFødselsnummer = 'Fødselsnummeret er ugyldig',
    IngenTilgangEllerIkkeFinnes = 'Du har enten ikke tilgang til denne kandidaten eller så finnes ikke kandidaten i systemet',
    Serverfeil = 'Det skjedde dessverre en feil',
    IngenFeil = 'Ingen feil',
}

export interface AktørIdOgStatus {
    aktørId: string;
    feilmelding?: Feilmelding;
    kandidatEksisterer: boolean;
    henterAktørId: boolean;
    hentAktørId: () => void;
}

export const useAktørId = (fnr: string): AktørIdOgStatus => {
    const [aktørId, setAktørId] = useState<string>('');
    const [feilmelding, setFeilmelding] = useState<Feilmelding | undefined>(undefined);
    const [kandidatEksisterer, setKandidatEksisterer] = useState<boolean>(false);
    const [henterAktørId, setHenterAktørId] = useState<boolean>(false);

    const hentAktørId = useCallback(async () => {
        try {
            validerFnr(fnr);
            setHenterAktørId(true);
            const gjeldendeAktørId = await hentOgSjekkAktørId(fnr);
            await sjekkSkrivetilgang(gjeldendeAktørId);
            await sjekkKandidatEksisterer(gjeldendeAktørId);
            setAktørId(gjeldendeAktørId);
            setKandidatEksisterer(true);
        } catch (status) {
            setFeilmelding(status);
            setHenterAktørId(false);
        }
    }, [fnr]);

    useEffect(() => {
        setFeilmelding(undefined);
    }, [fnr]);

    return {
        aktørId,
        feilmelding,
        kandidatEksisterer,
        henterAktørId,
        hentAktørId,
    };
};

const validerFnr = (fnr: string) => {
    if (erTom(fnr)) {
        throw Feilmelding.TomtFødselsnummer;
    } else if (!erGyldigFnr(fnr)) {
        throw Feilmelding.UgyldigFødselsnummer;
    }
};

const hentOgSjekkAktørId = async (fnr: string) => {
    let respons;
    try {
        respons = await hentAktørIdFraApi(fnr);
    } catch (error) {
        throw Feilmelding.Serverfeil;
    }

    const aktorIdFinnesIkke = !respons.data[fnr];
    const ingenIdenter = respons.data[fnr] && !respons.data[fnr].identer;
    if (aktorIdFinnesIkke || ingenIdenter) {
        throw Feilmelding.IngenTilgangEllerIkkeFinnes;
    }

    const gjeldendeAktørId = hentGjeldendeIdent(fnr, respons);
    if (gjeldendeAktørId) {
        return gjeldendeAktørId;
    } else {
        throw Feilmelding.Serverfeil;
    }
};

const sjekkSkrivetilgang = async (aktørId: string) => {
    const harSkrivetilgang = await hentSkrivetilgang(aktørId);
    if (!harSkrivetilgang) {
        throw Feilmelding.IngenTilgangEllerIkkeFinnes;
    }
};

const sjekkKandidatEksisterer = async (aktørId: string) => {
    try {
        await hentKandidat(aktørId);
    } catch (ignored) {
        throw Feilmelding.IngenTilgangEllerIkkeFinnes;
    }
};
