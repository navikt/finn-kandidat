import { ArbeidstidBehov, FysiskBehov, ArbeidsmijøBehov, GrunnleggendeBehov } from './Behov';

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
