import { ArbeidstidBehov } from '../../../../types/Behov';

export interface ArbeidstidKriterie {
    behov: ArbeidstidBehov;
    label: string;
}

export const arbeidstidKriterier: ArbeidstidKriterie[] = [
    { behov: ArbeidstidBehov.KanIkkeJobbe, label: 'Ikke kan jobbe nå' },
    { behov: ArbeidstidBehov.Heltid, label: 'Kan jobbe heltid' },
    {
        behov: ArbeidstidBehov.IkkeHeleDager,
        label: 'Kan jobbe hver ukedag, men ikke hele dager',
    },
    {
        behov: ArbeidstidBehov.BorteFasteDagerEllerTider,
        label: 'Må være borte fra jobben til faste dager eller tider',
    },
    { behov: ArbeidstidBehov.Fleksibel, label: 'Må ha fleksible arbeidsdager' },
];
