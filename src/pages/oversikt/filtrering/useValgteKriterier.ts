import { useEffect, useState } from 'react';
import { Behov, Behovfelt } from '../../../types/Behov';
import { hentBehovfeltMedTommeLister } from '../../../utils/behovUtils';
import { Filter, hentFilterFraUrl, lagQueryParams } from './filtreringslogikk';
import { useFilterContext } from './filter-context/FilterContext';
import { ValgteKriterier } from './Filtrering';
import { RouteComponentProps } from 'react-router';

interface UseValgteKriterier {
    valgteKriterier: ValgteKriterier;
    toggleValgtKriterie: (kriterie: Behov, behovfelt: Behovfelt) => void;
    slettValgteKriterier: () => void;
}

const useValgteKriterier = (props: RouteComponentProps): UseValgteKriterier => {
    const defaultValgteKriterier = hentBehovfeltMedTommeLister();

    const [mellomlagretFilter, setMellomlagretFilter] = useFilterContext();
    const [valgteKriterier, setValgteKriterier] = useState<ValgteKriterier>(defaultValgteKriterier);

    const brukMellomlagretFilter = () => {
        const urlHarIngenFilter = !props.location.search;
        if (urlHarIngenFilter && mellomlagretFilter) {
            setFilterIUrl(mellomlagretFilter);
        }
    };

    const brukFilterFraUrl = () => {
        const urlParams = props.location.search;
        const filterFraUrl = hentFilterFraUrl(urlParams);

        setMellomlagretFilter(filterFraUrl);
        setValgteKriterier(filterFraUrl);
    };

    useEffect(brukMellomlagretFilter, []);
    useEffect(brukFilterFraUrl, [props.location.search]);

    const setFilterIUrl = (filter?: Filter) => {
        const search = filter ? lagQueryParams(filter) : '';
        props.history.replace({ search });
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
