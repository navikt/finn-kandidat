import { FysiskBehov } from '../../../types/Behov';

export interface FysiskAlternativ {
    behov: FysiskBehov;
    label: string;
    beskrivelse?: string;
}

export const fysiskeAlternativer: FysiskAlternativ[] = [
    {
        behov: FysiskBehov.Arbeidsstilling,
        label: 'Varierte arbeidsstillinger',
    },
    {
        behov: FysiskBehov.Ergnonomi,
        label: 'Ergonomiske tilpasninger',
        beskrivelse: 'For eksempel hev/senk-pult eller tilpassede lys- eller lydforhold',
    },
    { behov: FysiskBehov.TungeLøft, label: 'Unngå tunge løft' },
    { behov: FysiskBehov.Hørsel, label: 'Hørsel' },
    { behov: FysiskBehov.Syn, label: 'Syn' },
    { behov: FysiskBehov.AndreFormer, label: 'Andre former for fysisk tilrettelegging' },
];
