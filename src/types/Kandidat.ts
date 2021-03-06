import { AlleBehov } from './Behov';

export type Kandidat = KandidatUtenBehov & AlleBehov;

interface KandidatUtenBehov {
    aktørId: string;
    fnr: string;
    sistEndret: Date;
    sistEndretAv: string;
    navKontor?: string;
}

export enum Status {
    'IkkeLastet',
    'LasterInn',
    'SenderInn',
    'Suksess',
    'Feil',
}

interface IkkeLastet {
    status: Status.IkkeLastet;
}

interface LasterInn {
    status: Status.LasterInn;
}

interface SenderInn {
    status: Status.SenderInn;
    data: Kandidat;
}

interface Suksess<T> {
    status: Status.Suksess;
    data: T;
}

interface Feil {
    status: Status.Feil;
    error: string;
}

type Nettressurs<T> = IkkeLastet | LasterInn | SenderInn | Suksess<T> | Feil;

export type RestKandidat = Nettressurs<Kandidat>;
export type RestKandidater = Nettressurs<Kandidat[]>;
