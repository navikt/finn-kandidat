import { AlleBehov } from './Behov';

interface KandidatUtenBehov {
    fnr: string;
    sistEndret?: Date;
    sistEndretAv?: string;
}

type Kandidat = KandidatUtenBehov & AlleBehov;

export default Kandidat;
