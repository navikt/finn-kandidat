import { GrunnleggendeBehov } from '../../../types/Behov';

export interface GrunnleggendeAlternativ {
    behov: GrunnleggendeBehov;
    label: string;
}

export const grunnleggendeAlternativer: GrunnleggendeAlternativ[] = [
    {
        behov: GrunnleggendeBehov.SnakkeNorsk,
        label: 'Snakke norsk',
    },
    {
        behov: GrunnleggendeBehov.SkriveNorsk,
        label: 'Skrive norsk',
    },
    {
        behov: GrunnleggendeBehov.LeseNorsk,
        label: 'Lese norsk',
    },
    { behov: GrunnleggendeBehov.RegningOgTallforståelse, label: 'Regning og tallforståelse' },
    { behov: GrunnleggendeBehov.AndreUtfordringer, label: 'Andre utfordringer' },
];
