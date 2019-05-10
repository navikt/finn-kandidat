import { GrunnleggendeBehov } from '../../../../types/Behov';

export interface GrunnleggendeKriterie {
    behov: GrunnleggendeBehov;
    label: string;
}

export const grunnleggendeKriterier: GrunnleggendeKriterie[] = [
    {
        behov: GrunnleggendeBehov.SnakkeNorsk,
        label: 'Å snakke norsk',
    },
    {
        behov: GrunnleggendeBehov.SkriveNorsk,
        label: 'Å skrive norsk',
    },
    {
        behov: GrunnleggendeBehov.LeseNorsk,
        label: 'Å lese norsk',
    },
    { behov: GrunnleggendeBehov.RegningOgTallforståelse, label: 'Regning og tallforståelse' },
    { behov: GrunnleggendeBehov.AndreUtfordringer, label: 'Annet' },
];
