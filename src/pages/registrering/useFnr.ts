import { useCallback, useEffect, useState } from 'react';
import { hentFnr } from '../../api/aktørregisterApi';
import { Feilmelding } from '../før-du-begynner/useAktørId';
import { hentGjeldendeIdent } from '../../api/aktørregisterUtils';

const useFnr = (aktørId: string): string => {
    const [fnr, setFnr] = useState<string>('');

    const hentOgSettFnr = useCallback(async () => {
        try {
            const fnr = await hentOgSjekkFnr(aktørId);
            setFnr(fnr);
        } catch (ignored) {}
    }, [aktørId]);

    useEffect(() => {
        hentOgSettFnr();
    }, [hentOgSettFnr]);

    return fnr;
};

const hentOgSjekkFnr = async (aktørId: string) => {
    let respons;
    try {
        respons = await hentFnr(aktørId);
    } catch (error) {
        // Hva skal skje om dette ikke går?
        throw Feilmelding.Serverfeil;
    }

    // TODO Helt duplisert fra aktørIdKall
    const fnrFinnesIkke = !respons.data[aktørId];
    const ingenIdenter = respons.data[aktørId] && !respons.data[aktørId].identer;
    if (fnrFinnesIkke || ingenIdenter) {
        throw Feilmelding.IngenTilgangEllerIkkeFinnes;
    }

    const gjeldendeFnr = hentGjeldendeIdent(aktørId, respons);
    if (gjeldendeFnr) {
        return gjeldendeFnr;
    } else {
        throw Feilmelding.Serverfeil;
    }
};

export default useFnr;
