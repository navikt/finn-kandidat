import { arbeidstidAlternativer } from './arbeidstid/alternativer';
import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    FysiskBehov,
    GrunnleggendeBehov,
} from '../../types/Behov';
import { fysiskeAlternativer } from './fysisk/alternativer';
import { arbeidsmiløAlternativer } from './arbeidsmiljø/alternativer';
import { grunnleggendeAlternativer } from './grunnleggende-ferdigheter/alternativer';

test('Arbeidstidalternativ skal inneholde alle behov', () => {
    alternativSkalInneholdeAlleBehov(arbeidstidAlternativer, ArbeidstidBehov);
});

test('Fysiske alternativ skal inneholde alle behov', () => {
    alternativSkalInneholdeAlleBehov(fysiskeAlternativer, FysiskBehov);
});

test('Arbeidsmlijøalternativ skal inneholde alle behov', () => {
    alternativSkalInneholdeAlleBehov(arbeidsmiløAlternativer, ArbeidsmijøBehov);
});

test('Grunnleggende alternativ skal inneholde alle behov', () => {
    alternativSkalInneholdeAlleBehov(grunnleggendeAlternativer, GrunnleggendeBehov);
});

const alternativSkalInneholdeAlleBehov = (alternativer: any, alleBehov: any) => {
    const behovIKriterier = alternativer.map((alternativ: any) => alternativ.behov).sort();
    const sorterteBehov = Object.values(alleBehov).sort();
    expect(behovIKriterier).toEqual(sorterteBehov);
};
