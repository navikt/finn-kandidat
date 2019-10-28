import { Kandidat } from '../../../../types/Kandidat';
import { ArbeidsmijøBehov, ArbeidstidBehov } from '../../../../types/Behov';
import { hentUnikeKontor } from './kandidatenesKontor';

test('Skal returnere unike kontor', () => {
    const unikeKontor = hentUnikeKontor(kandidater);
    expect(unikeKontor).toEqual(new Set(['1002', '1003', 'ingenEnhet']));
});

const kandidater: Kandidat[] = [
    {
        aktørId: '4943247287476',
        fnr: '07058706846',
        sistEndret: new Date(),
        sistEndretAv: 'J337738',
        arbeidstidBehov: [ArbeidstidBehov.Fleksibel],
        fysiskeBehov: [],
        grunnleggendeBehov: [],
        arbeidsmiljøBehov: [],
        navKontor: '1003',
    },
    {
        aktørId: '5669594346088',
        fnr: '29089686189',
        sistEndret: new Date(),
        sistEndretAv: 'G031593',
        arbeidstidBehov: [ArbeidstidBehov.IkkeHeleDager],
        fysiskeBehov: [],
        grunnleggendeBehov: [],
        arbeidsmiljøBehov: [ArbeidsmijøBehov.TilrettelagteArbeidsoppgaver, ArbeidsmijøBehov.Annet],
        navKontor: '1002',
    },
    {
        aktørId: '9530979332682',
        fnr: '22117685040',
        sistEndret: new Date(),
        sistEndretAv: 'L631162',
        arbeidstidBehov: [ArbeidstidBehov.Heltid],
        fysiskeBehov: [],
        grunnleggendeBehov: [],
        arbeidsmiljøBehov: [],
        navKontor: '1002',
    },
    {
        aktørId: '9530979332682',
        fnr: '22117685040',
        sistEndret: new Date(),
        sistEndretAv: 'L631162',
        arbeidstidBehov: [ArbeidstidBehov.Heltid],
        fysiskeBehov: [],
        grunnleggendeBehov: [],
        arbeidsmiljøBehov: [],
        navKontor: null,
    },
];
