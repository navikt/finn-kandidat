import { erGyldigFnr } from '../pages/før-du-begynner/fnr-input/fnrUtils';
import { ArbeidstidBehov, FysiskBehov, GrunnleggendeBehov, ArbeidsmijøBehov } from '../types/Behov';

const config = {
    antallKandidater: 200,

    tidligstSistEndret: new Date(2019, 0, 1),
    tidligstFødt: new Date(1970, 0, 1),
    senestFødt: new Date(2001, 0, 1),

    // Sannsynlighet fra 0 til 1
    sjanseForFysiskebehov: 0.25,
    sjanseForGrunnleggendebehov: 0.25,
    sjanseForArbeidsmiljøbehov: 0.25,
};

const formaterDato = (dato: Date) =>
    String(dato.getDate()).padStart(2, '0') +
    String(dato.getMonth()).padStart(2, '0') +
    String(dato.getFullYear()).substr(2);

const randomInt = (upperLimit: number) => Math.floor(Math.random() * upperLimit);

const skapTilfeldigDato = (start: Date, end: Date) =>
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const skapTilfeldigFødselsnummer = (tidligstFødt: Date, senestFødt: Date) => {
    const fødselsdato = formaterDato(skapTilfeldigDato(tidligstFødt, senestFødt));
    const personnummer = randomInt(99999)
        .toString()
        .padStart(5, '0');

    return fødselsdato + personnummer;
};

const skapTilfeldigBrukernavn = () => {
    const alfabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return (
        alfabet[randomInt(alfabet.length)] +
        Math.floor(Math.random() * 999999)
            .toString()
            .padStart(6, '0')
    );
};

const getEnumValues = (E: Object) => {
    const keys = Object.keys(E);
    const values = keys.map(k => (E as any)[k as any]);

    return values;
};

const getRandomValue = (E: object) => {
    const values = getEnumValues(E);
    const randomIndex = randomInt(values.length);
    return values[randomIndex];
};

const getRandomSelection = (E: object) => {
    const values = getEnumValues(E);
    const numberOfSelected = randomInt(values.length);
    const arrayOfLength = new Array(numberOfSelected).fill(0);
    const setOfSelections = new Set(arrayOfLength.map(() => values[randomInt(values.length)]));

    return Array.from(setOfSelections);
};

const hentTilfeldigUtvalg = (E: object, sjanseForNoenBehov: number = 1) =>
    Math.random() < sjanseForNoenBehov ? getRandomSelection(E) : [];

const skapKandidater = (antall: number = config.antallKandidater) => {
    const antallKandidater = antall;

    return [...new Array(antallKandidater).fill(0)].map(() => {
        const sistEndret = skapTilfeldigDato(config.tidligstSistEndret, new Date()).toISOString();

        let fnr = skapTilfeldigFødselsnummer(config.tidligstFødt, config.senestFødt);
        while (!erGyldigFnr(fnr)) {
            fnr = skapTilfeldigFødselsnummer(config.tidligstFødt, config.senestFødt);
        }

        return {
            aktørId: String(Math.floor(1000000000000 + Math.random() * 9000000000000)),
            fnr,
            sistEndret,
            sistEndretAv: skapTilfeldigBrukernavn(),
            arbeidstidBehov: getRandomValue(ArbeidstidBehov),
            fysiskeBehov: hentTilfeldigUtvalg(FysiskBehov, config.sjanseForFysiskebehov),
            grunnleggendeBehov: hentTilfeldigUtvalg(
                GrunnleggendeBehov,
                config.sjanseForGrunnleggendebehov
            ),
            arbeidsmiljøBehov: hentTilfeldigUtvalg(
                ArbeidsmijøBehov,
                config.sjanseForArbeidsmiljøbehov
            ),
        };
    });
};

export default skapKandidater;
