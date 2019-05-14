import arbeidstidSpørsmål from './arbeidstid/arbeidstidSpørsmål';
import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    FysiskBehov,
    GrunnleggendeBehov,
} from '../../types/Behov';
import fysiskeSpørsmål from './fysisk/fysiskSpørsmål';
import arbeidsmiløSpørsmål from './arbeidsmiljø/arbeidsmiljøSpørsmål';
import grunnleggendeSpørsmål from './grunnleggende-ferdigheter/grunnleggendeFerdigheterSpørsmål';

test('Arbeidstidalternativ skal inneholde alle behov', () => {
    alternativSkalInneholdeAlleBehov(arbeidstidSpørsmål.svaralternativer, ArbeidstidBehov);
});

test('Fysiske alternativ skal inneholde alle behov', () => {
    alternativSkalInneholdeAlleBehov(fysiskeSpørsmål.svaralternativer, FysiskBehov);
});

test('Arbeidsmlijøalternativ skal inneholde alle behov', () => {
    alternativSkalInneholdeAlleBehov(arbeidsmiløSpørsmål.svaralternativer, ArbeidsmijøBehov);
});

test('Grunnleggende alternativ skal inneholde alle behov', () => {
    alternativSkalInneholdeAlleBehov(grunnleggendeSpørsmål.svaralternativer, GrunnleggendeBehov);
});

const alternativSkalInneholdeAlleBehov = (alternativer: any, alleBehov: any) => {
    const behovIKriterier = alternativer.map((alternativ: any) => alternativ.behov).sort();
    const sorterteBehov = Object.values(alleBehov).sort();
    expect(behovIKriterier).toEqual(sorterteBehov);
};
