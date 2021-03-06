import { ArbeidsmijøBehov } from '../../../../types/Behov';

export interface ArbeidsmiløKriterie {
    behov: ArbeidsmijøBehov;
    label: string;
}

export const arbeidsmiløKriterier: ArbeidsmiløKriterie[] = [
    {
        behov: ArbeidsmijøBehov.TilrettelagtOpplæring,
        label: 'Tilrettelagt opplæring',
    },
    {
        behov: ArbeidsmijøBehov.TilrettelagteArbeidsoppgaver,
        label: 'Tilrettelagte arbeidsoppgaver',
    },
    {
        behov: ArbeidsmijøBehov.Mentor,
        label: 'Mentor',
    },
    { behov: ArbeidsmijøBehov.Annet, label: 'Andre former for tilrettelegging' },
];
