import { ArbeidstidBehov } from '../../../types/Behov';

export const alternativer = [
    { value: ArbeidstidBehov.KanIkkeJobbe, label: 'Kan ikke jobbe nå' },
    { value: ArbeidstidBehov.Heltid, label: 'Heltid' },
    {
        value: ArbeidstidBehov.IkkeHeleDager,
        label: 'Kan jobbe hver ukedag, men ikke hele dager',
    },
    {
        value: ArbeidstidBehov.BorteFasteDagerEllerTider,
        label: 'Må være borte fra jobben til faste dager eller tider',
    },
    { value: ArbeidstidBehov.Fleksibel, label: 'Må ha fleksible arbeidsdager' },
];

export default alternativer;
