import { Kandidat } from '../../../../types/Kandidat';

export const hentUnikeKontor = (kandidater: Kandidat[]): Set<string> => {
    const kontor = kandidater
        .filter(kandidat => kandidat.navKontor)
        .map(kandidat => kandidat.navKontor!);

    if (kandidater.some(kandidat => !kandidat.navKontor)) {
        kontor.push('ingenEnhet');
    }

    return new Set<string>(kontor);
};
