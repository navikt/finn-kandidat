import { arbeidstidKriterier } from './arbeidstidKriterier';
import { arbeidstidAlternativer } from '../../../registrering/arbeidstid/alternativer';
import { fysiskeKriterier } from './fysiskeKriterier';
import { arbeidsmiløKriterier } from './arbeidsmiljøKriterier';
import { fysiskeAlternativer } from '../../../registrering/fysisk/alternativer';
import { arbeidsmiløAlternativer } from '../../../registrering/arbeidsmiljø/alternativer';
import { grunnleggendeKriterier } from './grunnleggendeKriterier';
import { grunnleggendeAlternativer } from '../../../registrering/grunnleggende-ferdigheter/alternativer';
import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    FysiskBehov,
    GrunnleggendeBehov,
} from '../../../../types/Behov';
import { Kriterie } from '../Filtrering';

test('Skal være like mange arbeidstidkriterier som alternativer', () => {
    expect(arbeidstidKriterier.length).toBe(arbeidstidAlternativer.length);
});

test('Skal være like mange fysiske kriterier som alternativer', () => {
    expect(fysiskeKriterier.length).toBe(fysiskeAlternativer.length);
});

test('Skal være like mange arbeidsmiljøkriterier som alternativer', () => {
    expect(arbeidsmiløKriterier.length).toBe(arbeidsmiløAlternativer.length);
});

test('Skal være like mange grunnleggende kriterier som alternativer', () => {
    expect(grunnleggendeKriterier.length).toBe(grunnleggendeAlternativer.length);
});

test('Arbeidstidkriterier skal inneholde alle behov', () => {
    kriterierSkalInneholdeAlleBehov(arbeidstidKriterier, ArbeidstidBehov);
});

test('Fysiske kriterier skal inneholde alle behov', () => {
    kriterierSkalInneholdeAlleBehov(fysiskeKriterier, FysiskBehov);
});

test('Arbeidsmiljøkriterier skal inneholde alle behov', () => {
    kriterierSkalInneholdeAlleBehov(arbeidsmiløKriterier, ArbeidsmijøBehov);
});

test('Grunnleggende kriterier skal inneholde alle behov', () => {
    kriterierSkalInneholdeAlleBehov(grunnleggendeKriterier, GrunnleggendeBehov);
});

const kriterierSkalInneholdeAlleBehov = (kriterier: Kriterie[], alleBehov: any) => {
    const behovIKriterier = kriterier.map(kriterie => kriterie.behov).sort();
    const sorterteBehov = Object.values(alleBehov).sort();
    expect(behovIKriterier).toEqual(sorterteBehov);
};
