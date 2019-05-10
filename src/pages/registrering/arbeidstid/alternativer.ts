import { ArbeidstidBehov } from '../../../types/Behov';

export interface ArbeidstidAlternativ {
    behov: ArbeidstidBehov;
    label: string;
}

export const arbeidstidAlternativer: ArbeidstidAlternativ[] = [
    { behov: ArbeidstidBehov.KanIkkeJobbe, label: 'Kan ikke jobbe nå' },
    { behov: ArbeidstidBehov.Heltid, label: 'Heltid' },
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
