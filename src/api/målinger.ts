import { AlleFilter } from '../pages/oversikt/filtrering/filtreringslogikk';
import api from './initialize';
import { Behovfelt } from '../types/Behov';

export const loggKlikkPåKandidat = (aktiveFilter: AlleFilter) => {
    const leggTilPrefix = (behovfelt: Behovfelt) =>
        (aktiveFilter[behovfelt] as any).map((felt: Behovfelt) => `${behovfelt}.${felt}`);

    const data = {
        eventnavn: 'kandidat.klikk',
        felter: {
            aktiveFelter: [
                ...leggTilPrefix(Behovfelt.ArbeidstidBehov),
                ...leggTilPrefix(Behovfelt.FysiskeBehov),
                ...leggTilPrefix(Behovfelt.ArbeidsmiljøBehov),
                ...leggTilPrefix(Behovfelt.GrunnleggendeBehov),
            ],
        },
    };

    api.post('/logging', data);
};

export const loggKlikkPåRegistrering = () => {
    const data = {
        eventnavn: 'registrering.klikk',
    };
    api.post('/logging', data);
};

export const loggKlikkPåFinnKandidater = () => {
    const data = {
        eventnavn: 'finn-kandidater.klikk',
    };
    api.post('/logging', data);
};
