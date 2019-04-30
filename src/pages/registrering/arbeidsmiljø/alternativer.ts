import { ArbeidsmijøBehov } from '../../../types/Behov';

export const alternativer = [
    {
        value: ArbeidsmijøBehov.TilrettelagtOpplæring,
        label: 'Tilrettelagt opplæring',
        beskrivelse: 'For eksempel hyppige tilbakemeldinger eller lengre opplæringsperiode',
    },
    {
        value: ArbeidsmijøBehov.TilrettelagteArbeidsoppgaver,
        label: 'Tilrettelagte arbeidsoppgaver',
        beskrivelse: 'For eksempel tydelige oppgaver eller unntak fra noen typer oppgaver',
    },
    {
        value: ArbeidsmijøBehov.Fadder,
        label: 'Fadder',
        beskrivelse: 'En egen person med ansvar for tett oppfølging',
    },
    { value: ArbeidsmijøBehov.Annet, label: 'Andre former for tilrettelegging' },
];

export default alternativer;
