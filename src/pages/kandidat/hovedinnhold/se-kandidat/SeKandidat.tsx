import React, { FunctionComponent } from 'react';

import { Behovfelt } from '../../../../types/Behov';
import { RestKandidat, Status } from '../../../../types/Kandidat';
import arbeidsmiljøSpørsmål from '../../../registrering/arbeidsmiljø/arbeidsmiljøSpørsmål';
import arbeidstidSpørsmål from '../../../registrering/arbeidstid/arbeidstidSpørsmål';
import fysiskeSpørsmål from '../../../registrering/fysisk/fysiskSpørsmål';
import grunnleggendeSpørsmål from '../../../registrering/grunnleggende-ferdigheter/grunnleggendeFerdigheterSpørsmål';
import RegistrertBehov from './registrert-behov/RegistrertBehov';

interface Props {
    kandidat: RestKandidat;
}

const SeKandidat: FunctionComponent<Props> = ({ kandidat }) => {
    let arbeidstidSvar, fysiskeSvar, arbeidsmiljøSvar, grunnleggendeSvar;

    if (kandidat.status === Status.Suksess) {
        arbeidstidSvar = kandidat.data[Behovfelt.ArbeidstidBehov];
        fysiskeSvar = kandidat.data[Behovfelt.FysiskeBehov];
        arbeidsmiljøSvar = kandidat.data[Behovfelt.ArbeidsmiljøBehov];
        grunnleggendeSvar = kandidat.data[Behovfelt.GrunnleggendeBehov];
    }

    return (
        <>
            <RegistrertBehov spørsmål={arbeidstidSpørsmål} svar={arbeidstidSvar} />
            <RegistrertBehov spørsmål={fysiskeSpørsmål} svar={fysiskeSvar} />
            <RegistrertBehov spørsmål={arbeidsmiljøSpørsmål} svar={arbeidsmiljøSvar} />
            <RegistrertBehov spørsmål={grunnleggendeSpørsmål} svar={grunnleggendeSvar} />
        </>
    );
};

export default SeKandidat;
