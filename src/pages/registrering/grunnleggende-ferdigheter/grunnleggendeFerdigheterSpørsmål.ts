import { GrunnleggendeBehov } from '../../../types/Behov';
import Spørsmål from '../Spørsmål';

const svaralternativer = [
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

const grunnleggendeFerdigheterSpørsmål: Spørsmål<GrunnleggendeBehov> = {
    tittel: 'Grunnleggende ferdigheter',
    spørsmål: 'Har du utfordringer med noe av dette?',
    svaralternativer,
};

export default grunnleggendeFerdigheterSpørsmål;
