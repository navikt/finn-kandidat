import FysiskTilrettelegging from '../../../types/FysiskTilrettelegging';

export const fysiskTilretteleggingAlternativer = [
    {
        value: FysiskTilrettelegging.VARIERTE_ARBEIDSSTILLINGER,
        label: 'Varierte arbeidsstillinger',
    },
    {
        value: FysiskTilrettelegging.ERGONOMISKE_TILPASNINGER,
        label: 'Ergonomiske tilpasninger',
        beskrivelse: 'For eksempel hev/senk-pult eller tilpassede lys- eller lydforhold',
    },
    { value: FysiskTilrettelegging.HØRSEL, label: 'Hørsel' },
    { value: FysiskTilrettelegging.SYN, label: 'Syn' },
    { value: FysiskTilrettelegging.ANDRE_FORMER, label: 'Andre former for fysisk tilrettelegging' },
    { value: FysiskTilrettelegging.VET_IKKE, label: 'Vet ikke' },
];

export default fysiskTilretteleggingAlternativer;
