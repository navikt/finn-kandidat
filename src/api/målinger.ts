import { Filter } from '../pages/oversikt/filtrering/filtreringslogikk';
import api from './initialize';

export const loggKlikkPåKandidat = (aktivtFilter: Filter) => {
    // TODO: Implementer med det nye endepunktet
    // const leggTilPrefix = (behovfelt: Behovfelt) =>
    //     (aktivtFilter[behovfelt] as any).map((felt: Behovfelt) => `${behovfelt}.${felt}`);
    // const data = {
    //     eventnavn: 'kandidat.klikk',
    //     felter: {
    //         aktiveFelter: hentAlleBehovfelt().flatMap((behov: Behovfelt) => leggTilPrefix(behov)),
    //     },
    // };
    // api.post('/logging', data);
};

export const loggKlikkPåRegistrering = () => {
    const data = {
        name: 'finn-kandidat.registrering.klikk',
        tags: {},
        fields: {},
    };
    api.post('/events', data);
};

export const loggKlikkPåFinnKandidater = () => {
    const data = {
        name: 'finn-kandidat.finn-kandidater.klikk',
        tags: {},
        fields: {},
    };
    api.post('/events', data);
};
