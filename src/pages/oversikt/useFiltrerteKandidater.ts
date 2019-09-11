import { useState, useEffect, useCallback } from 'react';
import {
    FiltrertKandidat,
    hentFilterFraUrl,
    tilFiltrertKandidat,
    filtrerKandidater,
    tellKandidatensMatchendeKriterier,
    summerValgteKriterier,
} from './filtrering/filtreringslogikk';
import { Kandidat, RestKandidater, Status } from '../../types/Kandidat';
import { useAppContext } from '../../utils/AppContext';
import { Location } from 'history';

const sorterPåMatchendeKriterier = (a: FiltrertKandidat, b: FiltrertKandidat) =>
    b.matchendeKriterier.length - a.matchendeKriterier.length;

const useFiltrerteKandidater = (
    alleKandidater: RestKandidater,
    visEgneKandidater: boolean,
    location: Location
) => {
    const { navIdent } = useAppContext();

    const [filtrerteKandidater, setFiltrerteKandidater] = useState<FiltrertKandidat[]>([]);
    const [antallValgteKriterier, setAntallValgteKriterier] = useState<number>(0);

    const brukVisEgneKandidaterFilter = useCallback(
        (kandidat: FiltrertKandidat) =>
            visEgneKandidater ? kandidat.sistEndretAv === navIdent : true,
        [navIdent, visEgneKandidater]
    );

    const brukKandidatfilter = useCallback(
        (kandidater: Kandidat[]) => {
            const filter = hentFilterFraUrl(location.search);

            const filtrerteKandidater = filtrerKandidater(kandidater, filter)
                .map(tilFiltrertKandidat)
                .map(tellKandidatensMatchendeKriterier(filter))
                .filter(brukVisEgneKandidaterFilter)
                .sort(sorterPåMatchendeKriterier);

            const { arbeidstidBehov, ...andreFiltre } = filter;

            setFiltrerteKandidater(filtrerteKandidater);
            setAntallValgteKriterier(summerValgteKriterier(arbeidstidBehov, andreFiltre));
        },
        [brukVisEgneKandidaterFilter, location.search]
    );

    useEffect(() => {
        brukKandidatfilter(alleKandidater.status === Status.Suksess ? alleKandidater.data : []);
    }, [brukKandidatfilter, alleKandidater]);

    return { filtrerteKandidater, antallValgteKriterier };
};

export default useFiltrerteKandidater;
