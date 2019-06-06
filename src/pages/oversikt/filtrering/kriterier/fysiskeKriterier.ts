import { FysiskBehov } from '../../../../types/Behov';

export interface FysiskKriterie {
    behov: FysiskBehov;
    label: string;
}

export const fysiskeKriterier: FysiskKriterie[] = [
    {
        behov: FysiskBehov.Arbeidsstilling,
        label: 'Varierte arbeidsstillinger',
    },
    {
        behov: FysiskBehov.Ergonomi,
        label: 'Ergonomiske tilpasninger',
    },
    { behov: FysiskBehov.TungeLøft, label: 'Å unngå tunge løft' },
    { behov: FysiskBehov.Hørsel, label: 'Hørselstilrettelegging' },
    { behov: FysiskBehov.Syn, label: 'Synstilrettelegging' },
    { behov: FysiskBehov.AndreFormer, label: 'Andre former for fysisk tilrettelegging' },
];
