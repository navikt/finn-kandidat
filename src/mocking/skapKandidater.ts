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

const alfabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

const shuffle = (a: any) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
};

const skapTilfeldigVeileder = (veilederPool: { [id: string]: number }) => {
    const veiledere = Object.keys(veilederPool);
    const sisteVeileder = veiledere[veiledere.length - 1];

    if (sisteVeileder && veilederPool[sisteVeileder] < config.antallKandidater * 0.1) {
        veilederPool[sisteVeileder] += 1;
        return sisteVeileder;
    }

    const nyVeileder =
        alfabet[randomInt(alfabet.length)] +
        Math.floor(Math.random() * 999999)
            .toString()
            .padStart(6, '0');

    veilederPool[nyVeileder] = 1;
    return nyVeileder;
};

const skapTilfeldigeVeiledere = (): string[] => {
    const veilederPool = {};

    return shuffle(
        [...new Array(config.antallKandidater)].map(() => skapTilfeldigVeileder(veilederPool))
    );
};

const skapTilfeldigAktørId = () =>
    String(Math.floor(1000000000000 + Math.random() * 9000000000000));

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
    const veiledere = skapTilfeldigeVeiledere();

    return [...new Array(antallKandidater).fill(0)].map((_, i) => {
        const sistEndret = skapTilfeldigDato(config.tidligstSistEndret, new Date()).toISOString();

        let fnr = skapTilfeldigFødselsnummer(config.tidligstFødt, config.senestFødt);
        while (!erGyldigFnr(fnr)) {
            fnr = skapTilfeldigFødselsnummer(config.tidligstFødt, config.senestFødt);
        }

        return {
            aktørId: skapTilfeldigAktørId(),
            fnr,
            sistEndret,
            sistEndretAv: veiledere[i],
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
