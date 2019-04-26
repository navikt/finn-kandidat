const formaterDato = (dato: Date) =>
    String(dato.getDate()).padStart(2, '0') +
    String(dato.getMonth()).padStart(2, '0') +
    String(dato.getFullYear()).substr(0, 2);

const getRandomInteger = (min: number, max: number) =>
    Math.max(min, Math.floor(Math.random() * max));

const skapTilfeldigDato = (start: Date, end: Date) =>
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const skapTilfeldigPersonnummer = () =>
    Math.floor(Math.random() * 99999)
        .toString()
        .padStart(5, '0');

const skapTilfeldigBrukernavn = () => {
    const alfabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return (
        alfabet[Math.floor(Math.random() * alfabet.length)] +
        Math.floor(Math.random() * 999999)
            .toString()
            .padStart(6, '0')
    );
};

const skapKandidater = (antall?: number) => {
    const antallKandidater = antall || getRandomInteger(1, 8);
    const tidligstFødt = new Date(1960, 0, 1);
    const senestFødt = new Date(2000, 0, 1);

    return [...Array(antallKandidater)].map(() => {
        const fødselsdato = formaterDato(skapTilfeldigDato(tidligstFødt, senestFødt));
        const fnr = fødselsdato + skapTilfeldigPersonnummer();
        const sistEndret = skapTilfeldigDato(new Date(2019, 0, 1), new Date()).toISOString();

        return {
            fnr,
            sistEndret,
            sistEndretAv: skapTilfeldigBrukernavn(),
            arbeidstidBehov: '',
            fysiskeBehov: [],
            grunnleggendeBehov: [],
            arbeidsmiljøBehov: [],
        };
    });
};

export default skapKandidater;
