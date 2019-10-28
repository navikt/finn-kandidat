import { Kandidat } from '../../../types/Kandidat';
import { Behov, Behovfelt, AlleBehov, ArbeidstidBehov } from '../../../types/Behov';
import { hentAlleBehovfelt } from '../../../utils/behovUtils';

export type Filter = AlleBehov;

export enum UrlParameter {
    KunEgne = 'kunEgne',
    Enhet = 'enhet',
}

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

export const summerValgteKriterier = (
    arbeidstidFilter: ArbeidstidBehov[],
    filtreUtenomArbeidstid: Object
) => {
    const antallArbeidstidkriterierSomPasserKandidat = arbeidstidFilter.length > 0 ? 1 : 0;
    const antallAndreKriterier = Object.values(filtreUtenomArbeidstid).flat().length;

    return antallArbeidstidkriterierSomPasserKandidat + antallAndreKriterier;
};

const intersectionAvBehov = (kandidatensBehov: Behov[], filter: Behov[]): Behov[] => {
    return filter.filter(behov => kandidatensBehov.includes(behov));
};

export const hentFilterFraUrl = (urlParams: string): Filter => {
    const searchParams = new URLSearchParams(urlParams);

    return hentAlleBehovfelt().reduce(
        (filter: Filter, behov: Behovfelt) => {
            const parametreForBehov = searchParams.getAll(behov);

            return {
                ...filter,
                [behov]: parametreForBehov,
            };
        },
        {} as Filter
    );
};

export const byggNyUrlMedFilter = (filter?: Filter): URL => {
    const url = new URL(window.location.href);

    if (filter) {
        Object.keys(filter).forEach((behovfelt: string) => {
            const kriterierForBehov = filter[behovfelt as Behovfelt];

            url.searchParams.delete(behovfelt);

            if (kriterierForBehov.length > 0) {
                kriterierForBehov.forEach((kriterie: Behov) => {
                    url.searchParams.append(behovfelt, kriterie);
                });
            }
        });
    }

    return url;
};
