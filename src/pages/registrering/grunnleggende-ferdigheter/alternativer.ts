import { GrunnleggendeBehov } from '../../../types/Behov';

export const alternativer = [
    {
        value: GrunnleggendeBehov.SnakkeNorsk,
        label: 'Snakke norsk',
    },
    {
        value: GrunnleggendeBehov.SkriveNorsk,
        label: 'Skrive norsk',
    },
    {
        value: GrunnleggendeBehov.LeseNorsk,
        label: 'Lese norsk',
    },
    { value: GrunnleggendeBehov.RegningOgTallforståelse, label: 'Regning og tallforståelse' },
    { value: GrunnleggendeBehov.DigitaleFerdigheter, label: 'Digitale ferdigheter' },
    { value: GrunnleggendeBehov.AndreUtfordringer, label: 'Andre utfordringer' },
];

export default alternativer;
