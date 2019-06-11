import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    FysiskBehov,
    GrunnleggendeBehov,
} from '../../../../types/Behov';

export const kandidatSomKanJobbeHeltid = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [],
    grunnleggendeBehov: [],
    arbeidsmiljøBehov: [],
};

export const kandidatSomKanJobbeFleksibelt = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Fleksibel],
    fysiskeBehov: [],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [],
};

export const kandidatSomTrengerErgonomiskTilrettelegging = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [FysiskBehov.Ergonomi],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [],
};

export const kandidatSomIkkeKanLøfteTung = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [FysiskBehov.TungeLøft],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [],
};

export const kandidatSomTrengerTilrettelagtOpplæring = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [],
    arbeidsmiljøBehov: [ArbeidsmijøBehov.TilrettelagtOpplæring],
    grunnleggendeBehov: [],
};

export const kandidatSomTrengerMentor = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [],
    arbeidsmiljøBehov: [ArbeidsmijøBehov.Mentor],
    grunnleggendeBehov: [],
};

export const kandidatSomTrengerTilretteleggingForHørsel = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [FysiskBehov.Hørsel],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [],
};

export const kandidatSomTrengerTilretteleggingForSyn = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [FysiskBehov.Syn],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [],
};

export const kandidatSomIkkeKanLøfteTungt = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [FysiskBehov.TungeLøft],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [],
};

export const kandidatSomIkkeKanJobbe = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.KanIkkeJobbe],
    fysiskeBehov: [],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [],
};

export const kandidatSomKanSnakkeNorsk = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [GrunnleggendeBehov.SnakkeNorsk],
};

export const kandidatSomKanSkriveNorsk = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [GrunnleggendeBehov.SkriveNorsk],
};

export const kandidatSomIkkeKanLøfteTungtOgSomTrengerMentor = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [FysiskBehov.TungeLøft],
    arbeidsmiljøBehov: [ArbeidsmijøBehov.Mentor],
    grunnleggendeBehov: [],
};

export const kandidatSomIkkeKanLøfteTungtOgSomTrengerErgonomiOgMentor = {
    fnr: '',
    arbeidstidBehov: [ArbeidstidBehov.Heltid],
    fysiskeBehov: [FysiskBehov.TungeLøft, FysiskBehov.Ergonomi],
    arbeidsmiljøBehov: [ArbeidsmijøBehov.Mentor],
    grunnleggendeBehov: [],
};

export const noenKandidater = [
    kandidatSomKanJobbeHeltid,
    kandidatSomKanJobbeFleksibelt,
    kandidatSomTrengerErgonomiskTilrettelegging,
    kandidatSomIkkeKanLøfteTung,
    kandidatSomTrengerTilrettelagtOpplæring,
    kandidatSomTrengerMentor,
    kandidatSomTrengerTilretteleggingForHørsel,
    kandidatSomTrengerTilretteleggingForSyn,
    kandidatSomIkkeKanLøfteTungt,
    kandidatSomIkkeKanJobbe,
    kandidatSomKanSnakkeNorsk,
    kandidatSomKanSkriveNorsk,
    kandidatSomIkkeKanLøfteTungtOgSomTrengerMentor,
];
