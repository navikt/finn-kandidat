import { ArbeidsmijøBehov } from '../../../types/Behov';

export interface ArbeidsmiløAlternativ {
    behov: ArbeidsmijøBehov;
    label: string;
    beskrivelse?: string;
}

export const arbeidsmiløAlternativer: ArbeidsmiløAlternativ[] = [
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
