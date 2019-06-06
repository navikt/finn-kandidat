import Kandidat from '../../../types/Kandidat';
import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    Behov,
    Behovfelt,
    FysiskBehov,
    GrunnleggendeBehov,
} from '../../../types/Behov';
import { ValgteKriterier } from './Filtrering';

export interface AlleFilter {
    [Behovfelt.ArbeidstidBehov]: ArbeidstidBehov[];
    [Behovfelt.FysiskeBehov]: FysiskBehov[];
    [Behovfelt.ArbeidsmiljøBehov]: ArbeidsmijøBehov[];
    [Behovfelt.GrunnleggendeBehov]: GrunnleggendeBehov[];
}

export type FiltrertKandidat = Kandidat & {
    matchendeKriterier: Behov[];
};

export const initMatchendeKriterier = (kandidat: Kandidat): FiltrertKandidat => ({
    ...kandidat,
    matchendeKriterier: [],
});

export const filtrerKandidater = (kandidater: Kandidat[], filter: AlleFilter) => {
    return kandidater
        .filter(passererKriterierOmArbeidstid(filter[Behovfelt.ArbeidstidBehov]))
        .filter(passererKriterierOmBehov(filter, Behovfelt.FysiskeBehov))
        .filter(passererKriterierOmBehov(filter, Behovfelt.ArbeidsmiljøBehov))
        .filter(passererKriterierOmBehov(filter, Behovfelt.GrunnleggendeBehov));
};

export const tellKandidatensMatchendeKriterier = (filter: AlleFilter) => (
    kandidat: FiltrertKandidat
) => ({
    ...kandidat,
    matchendeKriterier: [
        Behovfelt.ArbeidsmiljøBehov,
        Behovfelt.FysiskeBehov,
        Behovfelt.GrunnleggendeBehov,
    ].reduce(
        kombinerMatchendeKriterier(kandidat, filter),
        beholdMatchendeArbeidskriterie(kandidat, filter)
    ),
});

const passererKriterierOmArbeidstid = (arbeidstidFilter: ArbeidstidBehov[]) => (
    kandidat: Kandidat
) => {
    return arbeidstidFilter.length === 0
        ? kandidat
        : arbeidstidFilter.includes(kandidat[Behovfelt.ArbeidstidBehov]);
};

const passererKriterierOmBehov = (filter: AlleFilter, behovfelt: Behovfelt) => (
    kandidat: Kandidat
) => {
    const behovsfilter = filter[behovfelt] as Behov[];
    return behovsfilter.length === 0
        ? kandidat
        : behovsfilter.some(filter => (kandidat[behovfelt] as Behov[]).includes(filter));
};

const kombinerMatchendeKriterier = (kandidat: FiltrertKandidat, filter: AlleFilter) => (
    matchendeKriterier: Behov[],
    behovfelt: Behovfelt
): Behov[] => {
    const kandidatensBehov = kandidat[behovfelt] as any;
    const aktueltFilter = filter[behovfelt] as any;

    return matchendeKriterier.concat(intersectionAvBehov(kandidatensBehov, aktueltFilter));
};

const beholdMatchendeArbeidskriterie = (kandidat: FiltrertKandidat, filter: AlleFilter) =>
    filter[Behovfelt.ArbeidstidBehov].filter(
        arbeidstidKriterie => kandidat[Behovfelt.ArbeidstidBehov] == arbeidstidKriterie
    );

const intersectionAvBehov = (kandidatensBehov: Behov[], filter: Behov[]): Behov[] => {
    return filter.filter(behov => kandidatensBehov.includes(behov));
};

export const hentFiltreringFraUrl = (urlParams: string): AlleFilter => {
    const query = new URLSearchParams(urlParams);
    const arbeidstidFilter = query.getAll(Behovfelt.ArbeidstidBehov) as ArbeidstidBehov[];
    const fysiskFilter = query.getAll(Behovfelt.FysiskeBehov) as FysiskBehov[];
    const arbeidsmljøFilter = query.getAll(Behovfelt.ArbeidsmiljøBehov) as ArbeidsmijøBehov[];
    const grunnleggendeFilter = query.getAll(Behovfelt.GrunnleggendeBehov) as GrunnleggendeBehov[];

    return {
        arbeidstidBehov: arbeidstidFilter,
        fysiskeBehov: fysiskFilter,
        arbeidsmiljøBehov: arbeidsmljøFilter,
        grunnleggendeBehov: grunnleggendeFilter,
    };
};

export const lagQueryParams = (kriterier: ValgteKriterier) =>
    Object.entries(kriterier)
        .map(([behovfelt, alleBehov]: any) =>
            alleBehov.map((etbehov: Behov) => `${behovfelt}=${etbehov}`).join('&')
        )
        .filter(liste => liste.length !== 0)
        .join('&');
