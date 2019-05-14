import { ArbeidsmijøBehov } from '../../../types/Behov';
import Spørsmål from '../Spørsmål';

const svaralternativer = [
    {
        behov: ArbeidsmijøBehov.TilrettelagtOpplæring,
        label: 'Tilrettelagt opplæring',
        beskrivelse: 'For eksempel hyppige tilbakemeldinger eller lengre opplæringsperiode',
    },
    {
        behov: ArbeidsmijøBehov.TilrettelagteArbeidsoppgaver,
        label: 'Tilrettelagte arbeidsoppgaver',
        beskrivelse: 'For eksempel tydelige oppgaver eller unntak fra noen typer oppgaver',
    },
    {
        behov: ArbeidsmijøBehov.Fadder,
        label: 'Fadder',
        beskrivelse: 'En egen person med ansvar for tett oppfølging',
    },
    { behov: ArbeidsmijøBehov.Annet, label: 'Andre former for tilrettelegging' },
];

const arbeidsmiljøSpørsmål: Spørsmål<ArbeidsmijøBehov> = {
    tittel: 'Arbeidsmiljø',
    spørsmål: 'Hvilken arbeidssituasjon passer deg best?',
    svaralternativer,
};

export default arbeidsmiljøSpørsmål;
