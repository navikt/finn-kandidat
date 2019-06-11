import { Behovfelt } from '../types/Behov';
import { Filter } from '../pages/oversikt/filtrering/filtreringslogikk';
import { hentAlleBehovfelt } from '../utils/behovUtils';
import api from './initialize';

export const loggKlikkPåKandidat = (aktivtFilter: Filter) => {
    const leggTilPrefix = (behovfelt: Behovfelt) =>
        (aktivtFilter[behovfelt] as any).map((felt: Behovfelt) => `${behovfelt}.${felt}`);

    const data = {
        eventnavn: 'kandidat.klikk',
        felter: {
            aktiveFelter: hentAlleBehovfelt().flatMap((behov: Behovfelt) => leggTilPrefix(behov)),
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
