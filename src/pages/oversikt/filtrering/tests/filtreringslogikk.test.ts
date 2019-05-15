import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    FysiskBehov,
    GrunnleggendeBehov,
} from '../../../../types/Behov';
import { AlleFilter, filtrerKandidater } from '../filtreringslogikk';
import * as testdata from './testdata';

test('Alle kandidater skal vises hvis ingen filter er valgt', () => {
    const filter: AlleFilter = {
        arbeidstidBehov: [],
        fysiskeBehov: [],
        arbeidsmiljøBehov: [],
        grunnleggendeBehov: [],
    };
    const filtrerteKandidater = filtrerKandidater(testdata.noenKandidater, filter);
    expect(filtrerteKandidater.sort()).toEqual(testdata.noenKandidater.sort());
});

test('Ved valgt heltid skal kun kandidater som kan jobbe heltid bli vist', () => {
    const filter: AlleFilter = {
        arbeidstidBehov: [ArbeidstidBehov.Heltid],
        fysiskeBehov: [],
        arbeidsmiljøBehov: [],
        grunnleggendeBehov: [],
    };

    const filtrerteKandidater = filtrerKandidater(
        [testdata.kandidatSomKanJobbeHeltid, testdata.kandidatSomKanJobbeFleksibelt],
        filter
    );

    expect(filtrerteKandidater).toEqual([testdata.kandidatSomKanJobbeHeltid]);
});

test('Ved valgt ergnonomi skal kun kandidater som trenger ergonomisk tilrettelegging bli vist', () => {
    const filter: AlleFilter = {
        arbeidstidBehov: [],
        fysiskeBehov: [FysiskBehov.Ergnonomi],
        arbeidsmiljøBehov: [],
        grunnleggendeBehov: [],
    };

    const filtrerteKandidater = filtrerKandidater(
        [
            testdata.kandidatSomTrengerErgonomiskTilrettelegging,
            testdata.kandidatSomIkkeKanLøfteTung,
        ],
        filter
    );

    expect(filtrerteKandidater).toEqual([testdata.kandidatSomTrengerErgonomiskTilrettelegging]);
});

test('Ved valgt tilrettelagt opplæring skal kun kandidater som trenger tilrettelagt opplæring bli vist', () => {
    const filter: AlleFilter = {
        arbeidstidBehov: [],
        fysiskeBehov: [],
        arbeidsmiljøBehov: [ArbeidsmijøBehov.TilrettelagtOpplæring],
        grunnleggendeBehov: [],
    };

    const filtrerteKandidater = filtrerKandidater(
        [testdata.kandidatSomTrengerTilrettelagtOpplæring, testdata.kandidatSomTrengerFadder],
        filter
    );

    expect(filtrerteKandidater).toEqual([testdata.kandidatSomTrengerTilrettelagtOpplæring]);
});

test('Ved valgt snakke norsk skal kun kandidater som trenger kan snakke norsk bli vist', () => {
    const filter: AlleFilter = {
        arbeidstidBehov: [],
        fysiskeBehov: [],
        arbeidsmiljøBehov: [],
        grunnleggendeBehov: [GrunnleggendeBehov.SnakkeNorsk],
    };

    const filtrerteKandidater = filtrerKandidater(
        [testdata.kandidatSomKanSnakkeNorsk, testdata.kandidatSomKanSkriveNorsk],
        filter
    );

    expect(filtrerteKandidater).toEqual([testdata.kandidatSomKanSnakkeNorsk]);
});

test('Ved valgt fleksibel og heltid skal kandidater som kan jobbe fleksibelt eller heltid vises', () => {
    const filter: AlleFilter = {
        arbeidstidBehov: [ArbeidstidBehov.Heltid, ArbeidstidBehov.Fleksibel],
        fysiskeBehov: [],
        arbeidsmiljøBehov: [],
        grunnleggendeBehov: [],
    };

    const filtrerteKandidater = filtrerKandidater(
        [
            testdata.kandidatSomKanJobbeFleksibelt,
            testdata.kandidatSomKanJobbeHeltid,
            testdata.kandidatSomIkkeKanJobbe,
        ],
        filter
    );

    expect(filtrerteKandidater).toEqual([
        testdata.kandidatSomKanJobbeFleksibelt,
        testdata.kandidatSomKanJobbeHeltid,
    ]);
});

test('Ved valgt hørsel og syn skal kandidater har behov for tilrettelegging for syn eller hørsel vises', () => {
    const filter: AlleFilter = {
        arbeidstidBehov: [],
        fysiskeBehov: [FysiskBehov.Hørsel, FysiskBehov.Syn],
        arbeidsmiljøBehov: [],
        grunnleggendeBehov: [],
    };

    const filtrerteKandidater = filtrerKandidater(
        [
            testdata.kandidatSomTrengerTilretteleggingForHørsel,
            testdata.kandidatSomTrengerTilretteleggingForSyn,
            testdata.kandidatSomIkkeKanLøfteTungt,
        ],
        filter
    );

    expect(filtrerteKandidater).toEqual([
        testdata.kandidatSomTrengerTilretteleggingForHørsel,
        testdata.kandidatSomTrengerTilretteleggingForSyn,
    ]);
});

test('Ved valgt tunge løft og fadder skal kandidater ikke kan løfte tungt og som trenger fadder vises', () => {
    const filter: AlleFilter = {
        arbeidstidBehov: [],
        fysiskeBehov: [FysiskBehov.TungeLøft],
        arbeidsmiljøBehov: [ArbeidsmijøBehov.Fadder],
        grunnleggendeBehov: [],
    };

    const filtrerteKandidater = filtrerKandidater(
        [
            testdata.kandidatSomIkkeKanLøfteTungtOgSomTrengerFadder,
            testdata.kandidatSomIkkeKanLøfteTungt,
            testdata.kandidatSomTrengerFadder,
        ],
        filter
    );

    expect(filtrerteKandidater).toEqual([testdata.kandidatSomIkkeKanLøfteTungtOgSomTrengerFadder]);
});
