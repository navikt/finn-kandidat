import { FysiskBehov } from '../../../types/Behov';
import Spørsmål from '../Spørsmål';

const svaralternativer = [
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

const fysiskSpørsmål: Spørsmål<FysiskBehov> = {
    tittel: 'Fysisk tilrettelegging',
    spørsmål: 'Dersom du har behov for fysisk tilrettelegging, hva bør det legges til rette for?',
    svaralternativer,
};

export default fysiskSpørsmål;
