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

export const filtrerKandidater = (kandidater: Kandidat[], filter: AlleFilter): Kandidat[] => {
    kandidater = filtrerPåArbeidstid(kandidater, filter[Behovfelt.ArbeidstidBehov]);
    kandidater = filtrerPåFysisk(kandidater, filter[Behovfelt.FysiskeBehov]);
    kandidater = filtrerPåArbeidsmiljø(kandidater, filter[Behovfelt.ArbeidsmiljøBehov]);
    kandidater = filtrerPåGrunnleggende(kandidater, filter[Behovfelt.GrunnleggendeBehov]);
    return kandidater;
};

const filtrerPåArbeidstid = (kandidater: Kandidat[], filter: ArbeidstidBehov[]): Kandidat[] => {
    if (filter.length === 0) {
        return kandidater;
    }
    return kandidater.filter(kandidat => filter.includes(kandidat.arbeidstidBehov));
};

const filtrerPåFysisk = (kandidater: Kandidat[], filter: FysiskBehov[]): Kandidat[] => {
    if (filter.length === 0) {
        return kandidater;
    }

    return kandidater.filter(kandidat => {
        return kandidat.fysiskeBehov.some(fysiskBehov => filter.includes(fysiskBehov));
    });
};

const filtrerPåArbeidsmiljø = (kandidater: Kandidat[], filter: ArbeidsmijøBehov[]): Kandidat[] => {
    if (filter.length === 0) {
        return kandidater;
    }

    return kandidater.filter(kandidat => {
        return kandidat.arbeidsmiljøBehov.some(arbeidsmiljøBehov =>
            filter.includes(arbeidsmiljøBehov)
        );
    });
};

const filtrerPåGrunnleggende = (
    kandidater: Kandidat[],
    filter: GrunnleggendeBehov[]
): Kandidat[] => {
    if (filter.length === 0) {
        return kandidater;
    }

    return kandidater.filter(kandidat => {
        return kandidat.grunnleggendeBehov.some(grunnleggendeBehov =>
            filter.includes(grunnleggendeBehov)
        );
    });
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
