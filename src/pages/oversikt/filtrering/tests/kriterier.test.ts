import { arbeidstidKriterier } from '../kriterier/arbeidstidKriterier';
import arbeidstidAlternativer from '../../../registrering/arbeidstid/arbeidstidSpørsmål';
import { fysiskeKriterier } from '../kriterier/fysiskeKriterier';
import { arbeidsmiløKriterier } from '../kriterier/arbeidsmiljøKriterier';
import fysiskeAlternativer from '../../../registrering/fysisk/fysiskSpørsmål';
import arbeidsmiløAlternativer from '../../../registrering/arbeidsmiljø/arbeidsmiljøSpørsmål';
import { grunnleggendeKriterier } from '../kriterier/grunnleggendeKriterier';
import grunnleggendeAlternativer from '../../../registrering/grunnleggende-ferdigheter/grunnleggendeFerdigheterSpørsmål';
import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    FysiskBehov,
    GrunnleggendeBehov,
} from '../../../../types/Behov';
import { Kriterie } from '../Filtrering';

test('Skal være like mange arbeidstidkriterier som alternativer', () => {
    expect(arbeidstidKriterier.length).toBe(arbeidstidAlternativer.svaralternativer.length);
});

test('Skal være like mange fysiske kriterier som alternativer', () => {
    expect(fysiskeKriterier.length).toBe(fysiskeAlternativer.svaralternativer.length);
});

test('Skal være like mange arbeidsmiljøkriterier som alternativer', () => {
    expect(arbeidsmiløKriterier.length).toBe(arbeidsmiløAlternativer.svaralternativer.length);
});

test('Skal være like mange grunnleggende kriterier som alternativer', () => {
    expect(grunnleggendeKriterier.length).toBe(grunnleggendeAlternativer.svaralternativer.length);
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
