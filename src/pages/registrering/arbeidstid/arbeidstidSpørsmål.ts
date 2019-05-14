import { ArbeidstidBehov } from '../../../types/Behov';
import Spørsmål from '../Spørsmål';

const svaralternativer = [
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

const arbeidstidSpørsmål: Spørsmål<ArbeidstidBehov> = {
    tittel: 'Arbeidstid og arbeidskapasitet',
    spørsmål: 'Hvilken arbeidssituasjon passer deg best?',
    svaralternativer,
};

export default arbeidstidSpørsmål;
