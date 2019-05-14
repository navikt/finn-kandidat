/** Beregner gyldighet av fødselsnr med utgangspunkt i mod11.
 * @link https://no.wikipedia.org/wiki/F%C3%B8dselsnummer
 * @param verdi
 * @returns {boolean}
 */
export const erGyldigFnr = (verdi: string): boolean => {
    const fodselsnr = verdi.toString();
    if (!fodselsnr || fodselsnr.length !== 11) {
        return false;
    }

    const vekt1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
    const vekt2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

    const Q1 = vekt1.reduce(
        (samling, tall, indeks) => samling + parseInt(fodselsnr.charAt(indeks), 10) * tall,
        0
    );

    const Q2 = vekt2.reduce(
        (samling, tall, indeks) => samling + parseInt(fodselsnr.charAt(indeks), 10) * tall,
        0
    );

    let k1 = 11 - (Q1 % 11);
    if (k1 === 11) {
        k1 = 0;
    }

    let k2 = 11 - (Q2 % 11);
    if (k2 === 11) {
        k2 = 0;
    }

    return k1 === parseInt(fodselsnr.charAt(9), 10) && k2 === parseInt(fodselsnr.charAt(10), 10);
};

export const erTom = (verdi: string) => {
    return verdi.length === 0;
};

/** Beregner gyldighet for midlertidig fødselsnummer.
 *  Brukes f.eks. ved validering i onChange mens fødselsnummer ikke er ferdig utfylt.
 */
export const midlertidigGyldigFnr = (verdi: string): boolean => {
    const inneholderBareTall = verdi.match(/^[0-9]+$/);
    const mindreEllerLik11Tegn = verdi.length <= 11;
    return (inneholderBareTall && mindreEllerLik11Tegn) || erTom(verdi);
};

export const formaterFnr = (fnr: string) => [fnr.substr(0, 6), fnr.substr(6)].join(' ');
