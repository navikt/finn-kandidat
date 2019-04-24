import { FysiskBehov } from '../../../types/Behov';

export const alternativer = [
    {
        value: FysiskBehov.Arbeidsstilling,
        label: 'Varierte arbeidsstillinger',
    },
    {
        value: FysiskBehov.Ergnonomi,
        label: 'Ergonomiske tilpasninger',
        beskrivelse: 'For eksempel hev/senk-pult eller tilpassede lys- eller lydforhold',
    },
    { value: FysiskBehov.Hørsel, label: 'Hørsel' },
    { value: FysiskBehov.Syn, label: 'Syn' },
    { value: FysiskBehov.AndreFormer, label: 'Andre former for fysisk tilrettelegging' },
    { value: FysiskBehov.VetIkke, label: 'Vet ikke' },
];

export default alternativer;
