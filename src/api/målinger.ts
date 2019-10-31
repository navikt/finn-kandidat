import { Filter } from '../pages/oversikt/filtrering/filtreringslogikk';
import api from './initialize';
import { Behovfelt } from '../types/Behov';
import { hentAlleBehovfelt } from '../utils/behovUtils';

export const loggKlikkPåKandidat = (aktivtFilter: Filter) => {
    const leggTilPrefix = (behovfelt: Behovfelt) =>
        (aktivtFilter[behovfelt] as any).map((felt: Behovfelt) => `${behovfelt}.${felt}`);

    const aktiveFilterString = hentAlleBehovfelt()
        .flatMap((behov: Behovfelt) => leggTilPrefix(behov))
        .join(',');

    const data = {
        name: 'finn-kandidat.kandidat.klikk',
        tags: {},
        fields: {
            aktiveFilter: aktiveFilterString,
        },
    };

    api.post('/events', data);
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

export const loggInngangFraKandidatsøk = () => {
    const data = {
        name: 'finn-kandidat.inngang.kandidatsok',
        tags: {},
        fields: {},
    };

    api.post('/events', data);
};
