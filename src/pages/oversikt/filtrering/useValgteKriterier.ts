import { useState, useEffect } from 'react';
import { Behovfelt, Behov } from '../../../types/Behov';
import { hentBehovfeltMedTommeLister } from '../../../utils/behovUtils';
import { hentFilterFraUrl, lagQueryParams, Filter } from './filtreringslogikk';
import { History } from 'history';
import { useFilterContext } from './filter-context/FilterContext';
import { ValgteKriterier } from './Filtrering';

interface UseValgteKriterier {
    valgteKriterier: ValgteKriterier;
    toggleValgtKriterie: (kriterie: Behov, behovfelt: Behovfelt) => void;
    slettValgteKriterier: () => void;
}

const useValgteKriterier = (history: History): UseValgteKriterier => {
    const defaultValgteKriterier = hentBehovfeltMedTommeLister();

    const [mellomlagretFilter, setMellomlagretFilter] = useFilterContext();
    const [valgteKriterier, setValgteKriterier] = useState<ValgteKriterier>(defaultValgteKriterier);

    const brukMellomlagretFilter = () => {
        const urlHarIngenFilter = !location.search;
        if (urlHarIngenFilter && mellomlagretFilter) {
            setFilterIUrl(mellomlagretFilter);
        }
    };

    const brukFilterFraUrl = () => {
        const urlParams = location.search;
        const filterFraUrl = hentFilterFraUrl(urlParams);

        setMellomlagretFilter(filterFraUrl);
        setValgteKriterier(filterFraUrl);
    };

    useEffect(brukMellomlagretFilter, []);
    useEffect(brukFilterFraUrl, [location.search]);

    const setFilterIUrl = (filter?: Filter) => {
        const search = filter ? lagQueryParams(filter) : '';
        history.replace({ search });
    };

    const toggleKriterie = (kriterie: Behov, kriterier: Behov[]): Behov[] =>
        kriterier.includes(kriterie)
            ? kriterier.filter(k => k !== kriterie)
            : [...kriterier, kriterie];

    const toggleValgtKriterie = (kriterie: Behov, behovfelt: Behovfelt) => {
        setFilterIUrl({
            ...valgteKriterier,
            [behovfelt]: toggleKriterie(kriterie, valgteKriterier[behovfelt]),
        });
    };

    return {
        valgteKriterier,
        toggleValgtKriterie,
        slettValgteKriterier: () => setFilterIUrl(),
    };
};

export default useValgteKriterier;
