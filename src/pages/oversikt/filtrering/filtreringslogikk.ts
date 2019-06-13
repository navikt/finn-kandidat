import Kandidat from '../../../types/Kandidat';
import { Behov, Behovfelt, AlleBehov } from '../../../types/Behov';
import { hentAlleBehovfelt } from '../../../utils/behovUtils';
import { ValgteKriterier } from './Filtrering';

export type Filter = AlleBehov;

export type FiltrertKandidat = Kandidat & {
    matchendeKriterier: Behov[];
};

export const tilFiltrertKandidat = (kandidat: Kandidat): FiltrertKandidat => ({
    ...kandidat,
    matchendeKriterier: [],
});

export const filtrerKandidater = (kandidater: Kandidat[], filter: Filter) => {
    const behovsfilter = hentAlleBehovfelt().map(behovfelt =>
        passererKriterierOmBehov(filter, behovfelt)
    );

    return behovsfilter.reduce((kandidater, filter) => kandidater.filter(filter), kandidater);
};

export const tellKandidatensMatchendeKriterier = (filter: Filter) => (
    kandidat: FiltrertKandidat
) => ({
    ...kandidat,
    matchendeKriterier: hentAlleBehovfelt().reduce(
        kombinerMatchendeKriterier(kandidat, filter),
        []
    ),
});

const passererKriterierOmBehov = (filter: Filter, behovfelt: Behovfelt) => (kandidat: Kandidat) => {
    const behovsfilter = filter[behovfelt] as Behov[];
    return behovsfilter.length === 0
        ? kandidat
        : behovsfilter.some(filter => (kandidat[behovfelt] as Behov[]).includes(filter));
};

const kombinerMatchendeKriterier = (kandidat: FiltrertKandidat, filter: Filter) => (
    matchendeKriterier: Behov[],
    behovfelt: Behovfelt
): Behov[] => {
    const kandidatensBehov = kandidat[behovfelt];
    const aktueltFilter = filter[behovfelt];

    return matchendeKriterier.concat(intersectionAvBehov(kandidatensBehov, aktueltFilter));
};

const intersectionAvBehov = (kandidatensBehov: Behov[], filter: Behov[]): Behov[] => {
    return filter.filter(behov => kandidatensBehov.includes(behov));
};

export const hentFilterFraUrl = (urlParams: string): Filter => {
    const query = new URLSearchParams(urlParams);

    return hentAlleBehovfelt().reduce(
        (filter: Filter, behov: Behovfelt) => ({
            ...filter,
            [behov]: query.getAll(behov),
        }),
        {} as Filter
    );
};

export const lagQueryParams = (kriterier: ValgteKriterier) =>
    Object.entries(kriterier)
        .map(([behovfelt, alleBehov]: any) =>
            alleBehov.map((etbehov: Behov) => `${behovfelt}=${etbehov}`).join('&')
        )
        .filter(liste => liste.length !== 0)
        .join('&');
