import { Behov } from '../../types/Behov';

export interface Svaralternativ<T extends Behov> {
    behov: T;
    label: string;
    beskrivelse?: string;
}

interface Spørsmål<T extends Behov> {
    tittel: string;
    spørsmål: string;
    svaralternativer: Svaralternativ<T>[];
}

export default Spørsmål;
