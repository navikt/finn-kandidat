import { useState, useEffect, useCallback } from 'react';
import {
    FiltrertKandidat,
    hentFilterFraUrl,
    tilFiltrertKandidat,
    filtrerKandidater,
    tellKandidatensMatchendeKriterier,
    summerValgteKriterier,
    UrlParameter,
} from './filtrering/filtreringslogikk';
import { Kandidat, RestKandidater, Status } from '../../types/Kandidat';
import { useAppContext } from '../../utils/AppContext';
import { Location } from 'history';
import { useQueryState } from 'react-router-use-location-state';
import { ALLE_ENHETER } from './filtrering/enhetsfilter/Enhetsfilter';

const sorterPåMatchendeKriterier = (a: FiltrertKandidat, b: FiltrertKandidat) =>
    b.matchendeKriterier.length - a.matchendeKriterier.length;

const useFiltrerteKandidater = (alleKandidater: RestKandidater, location: Location) => {
    const { navIdent } = useAppContext();
    const [filtrerteKandidater, setFiltrerteKandidater] = useState<FiltrertKandidat[]>([]);
    const [antallValgteKriterier, setAntallValgteKriterier] = useState<number>(0);
    const [visEgneKandidater] = useQueryState<boolean>(UrlParameter.KunEgne, false);
    const [valgtEnhet] = useQueryState<string>(UrlParameter.Enhet, ALLE_ENHETER);

    const brukVisEgneKandidaterFilter = useCallback(
        (kandidat: FiltrertKandidat) =>
            visEgneKandidater ? kandidat.sistEndretAv === navIdent : true,
        [navIdent, visEgneKandidater]
    );

    const filtrerPåEnhet = useCallback(
        (kandidat: FiltrertKandidat) => {
            if (valgtEnhet === ALLE_ENHETER) return true;
            if (valgtEnhet === 'ingenEnhet' && kandidat.navKontor === null) return true;
            return kandidat.navKontor === valgtEnhet;
        },
        [valgtEnhet]
    );

    const brukKandidatfilter = useCallback(
        (kandidater: Kandidat[]) => {
            const filter = hentFilterFraUrl(location.search);

            const filtrerteKandidater = filtrerKandidater(kandidater, filter)
                .map(tilFiltrertKandidat)
                .map(tellKandidatensMatchendeKriterier(filter))
                .filter(brukVisEgneKandidaterFilter)
                .filter(filtrerPåEnhet)
                .sort(sorterPåMatchendeKriterier);

            const { arbeidstidBehov, ...andreFiltre } = filter;

            setFiltrerteKandidater(filtrerteKandidater);
            setAntallValgteKriterier(summerValgteKriterier(arbeidstidBehov, andreFiltre));
        },
        [brukVisEgneKandidaterFilter, filtrerPåEnhet, location.search]
    );

    useEffect(() => {
        brukKandidatfilter(alleKandidater.status === Status.Suksess ? alleKandidater.data : []);
    }, [brukKandidatfilter, alleKandidater]);

    return { filtrerteKandidater, antallValgteKriterier };
};

export default useFiltrerteKandidater;
