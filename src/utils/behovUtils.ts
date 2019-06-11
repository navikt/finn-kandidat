import { Behovfelt, AlleBehov } from '../types/Behov';

export const hentAlleBehovfelt = (): Behovfelt[] => Object.values(Behovfelt);

export const hentBehovfeltMedTommeLister = (): AlleBehov =>
    hentAlleBehovfelt().reduce<AlleBehov>(
        (tommeBehov: AlleBehov, behovfelt: Behovfelt) => ({
            ...tommeBehov,
            [behovfelt]: [],
        }),
        {} as AlleBehov
    );
