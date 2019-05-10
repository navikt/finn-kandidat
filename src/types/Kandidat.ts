import { ArbeidsmijøBehov, ArbeidstidBehov, FysiskBehov, GrunnleggendeBehov } from './Behov';

interface Kandidat {
    fnr: string;
    sistEndret?: Date;
    sistEndretAv?: string;

    arbeidstidBehov?: ArbeidstidBehov;
    fysiskeBehov: FysiskBehov[];
    arbeidsmiljøBehov: ArbeidsmijøBehov[];
    grunnleggendeBehov: GrunnleggendeBehov[];
}

export default Kandidat;
