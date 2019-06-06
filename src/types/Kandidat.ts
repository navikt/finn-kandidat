import {
    ArbeidstidBehov,
    FysiskBehov,
    ArbeidsmijøBehov,
    GrunnleggendeBehov,
    Behovfelt,
    Behov,
} from './Behov';

interface Kandidat {
    fnr: string;
    sistEndret?: Date;
    sistEndretAv?: string;

    [Behovfelt.ArbeidstidBehov]: ArbeidstidBehov;
    [Behovfelt.FysiskeBehov]: FysiskBehov[];
    [Behovfelt.ArbeidsmiljøBehov]: ArbeidsmijøBehov[];
    [Behovfelt.GrunnleggendeBehov]: GrunnleggendeBehov[];
}

export default Kandidat;
