import Arbeidssituasjon from '../../../types/Arbeidssituasjon';

export const arbeidssituasjonRadios = [
    { value: Arbeidssituasjon.KAN_IKKE_JOBBE, label: 'Kan ikke jobbe nå' },
    { value: Arbeidssituasjon.HELTID, label: 'Heltid' },
    {
        value: Arbeidssituasjon.HVER_UKEDAG_MEN_IKKE_HELE_DAGER,
        label: 'Kan jobbe hver ukedag, men ikke hele dager',
    },
    {
        value: Arbeidssituasjon.BORTE_FASTE_DAGER_ELLER_TIDE,
        label: 'Må være borte fra jobben til faste dager eller tider',
    },
    { value: Arbeidssituasjon.FLEKSIBLE_ARBEIDSDAGER, label: 'Må ha fleksible arbeidsdager' },
];

export default arbeidssituasjonRadios;
