import { useEffect, useState } from 'react';
import { History, Location } from 'history';

import { Behov, Behovfelt } from '../../../types/Behov';
import { Filter, hentFilterFraUrl, byggNyUrlMedFilter } from './filtreringslogikk';
import { hentBehovfeltMedTommeLister } from '../../../utils/behovUtils';
import { useFilterContext } from './filter-context/FilterContext';
import { ValgteKriterier } from './Filtrering';

interface UseValgteKriterier {
    valgteKriterier: ValgteKriterier;
    toggleValgtKriterie: (kriterie: Behov, behovfelt: Behovfelt) => void;
}

const useValgteKriterier = (history: History, location: Location): UseValgteKriterier => {
    const defaultValgteKriterier = hentBehovfeltMedTommeLister();

    const [mellomlagretFilter, setMellomlagretFilter] = useFilterContext();
    const [valgteKriterier, setValgteKriterier] = useState<ValgteKriterier>(defaultValgteKriterier);

    const settNyttFilterIUrl = (filter?: Filter) => {
        const { search } = byggNyUrlMedFilter(filter);
        history.replace({ search });
    };

    const brukMellomlagretFilter = () => {
        const urlHarIngenFilter = !location.search;
        if (urlHarIngenFilter && mellomlagretFilter) {
            settNyttFilterIUrl(mellomlagretFilter);
        }
    };

    const brukFilterFraUrl = () => {
        const filterFraUrl = hentFilterFraUrl(location.search);

        setMellomlagretFilter(filterFraUrl);
        setValgteKriterier(filterFraUrl);
    };

    const toggleKriterie = (kriterie: Behov, kriterier: Behov[]): Behov[] =>
        kriterier.includes(kriterie)
            ? kriterier.filter(k => k !== kriterie)
            : [...kriterier, kriterie];

    const toggleValgtKriterie = (kriterie: Behov, behovfelt: Behovfelt) => {
        settNyttFilterIUrl({
            ...valgteKriterier,
            [behovfelt]: toggleKriterie(kriterie, valgteKriterier[behovfelt]),
        });
    };

    useEffect(brukMellomlagretFilter, []);
    useEffect(brukFilterFraUrl, [location.search]);

    return {
        valgteKriterier,
        toggleValgtKriterie,
    };
};

export default useValgteKriterier;
