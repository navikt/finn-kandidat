import { useCallback, useEffect, useState } from 'react';
import { hentKandidat, hentSkrivetilgang } from '../../api/finnKandidatApi';
import { hentGjeldendeIdent } from '../../api/aktørregisterUtils';
import { erGyldigFnr, erTom } from './fnr-input/fnrUtils';
import { hentAktørId } from '../../api/aktørregisterApi';

export enum TilgangsStatus {
    TomtFødselsnummer = 'Vennligst fyll ut fødselsnummer',
    UgyldigFødselsnummer = 'Fødselsnummeret er ugyldig',
    IngenTilgangEllerIkkeFinnes = 'Du har enten ikke tilgang til denne kandidaten eller så finnes ikke kandidaten i systemet',
    Serverfeil = 'Det skjedde dessverre en feil',
    IngenFeil = 'Ingen feil',
}

export interface AktørIdOgStatus {
    aktørId?: string;
    tilgangsstatus: TilgangsStatus;
    kandidatEksisterer: boolean;
}

const useAktørId = (fnr: string, sjekkerTilgangOgEksistens: boolean): AktørIdOgStatus => {
    const [aktørId, setAktørId] = useState<string | undefined>(undefined);
    const [tilgangsstatus, setTilgangsstatus] = useState<TilgangsStatus>(TilgangsStatus.IngenFeil);
    const [kandidatEksisterer, setKandidatEksisterer] = useState<boolean>(false);

    const hentAktørIdOgSjekkTilgang = useCallback(async () => {
        try {
            validerFnr(fnr);
            const gjeldendeAktørId = await hentOgSjekkAktørId(fnr);
            await sjekkSkrivetilgang(gjeldendeAktørId);
            await sjekkKandidatEksisterer(gjeldendeAktørId);
            setAktørId(gjeldendeAktørId);
            setKandidatEksisterer(true);
        } catch (status) {
            setTilgangsstatus(status);
        }
    }, [fnr]);

    useEffect(() => {
        if (sjekkerTilgangOgEksistens) {
            hentAktørIdOgSjekkTilgang();
        }
    }, [sjekkerTilgangOgEksistens, hentAktørIdOgSjekkTilgang]);

    useEffect(() => {
        setTilgangsstatus(TilgangsStatus.IngenFeil);
    }, [fnr]);

    return { aktørId, tilgangsstatus, kandidatEksisterer };
};

const validerFnr = (fnr: string) => {
    if (erTom(fnr)) {
        throw TilgangsStatus.TomtFødselsnummer;
    } else if (!erGyldigFnr(fnr)) {
        throw TilgangsStatus.UgyldigFødselsnummer;
    }
};

const hentOgSjekkAktørId = async (fnr: string) => {
    let respons;
    try {
        respons = await hentAktørId(fnr);
    } catch (error) {
        throw TilgangsStatus.Serverfeil;
    }

    const aktorIdFinnesIkke = !respons.data[fnr];
    const ingenIdenter = respons.data[fnr] && !respons.data[fnr].identer;
    if (aktorIdFinnesIkke || ingenIdenter) {
        throw TilgangsStatus.IngenTilgangEllerIkkeFinnes;
    }

    const gjeldendeAktørId = hentGjeldendeIdent(fnr, respons);
    if (gjeldendeAktørId) {
        return gjeldendeAktørId;
    } else {
        throw TilgangsStatus.Serverfeil;
    }
};

const sjekkSkrivetilgang = async (aktørId: string) => {
    const harSkrivetilgang = await hentSkrivetilgang(aktørId);
    if (!harSkrivetilgang) {
        throw TilgangsStatus.IngenTilgangEllerIkkeFinnes;
    }
};

const sjekkKandidatEksisterer = async (aktørId: string) => {
    try {
        await hentKandidat(aktørId);
    } catch (ignored) {
        throw TilgangsStatus.IngenTilgangEllerIkkeFinnes;
    }
};

export default useAktørId;
