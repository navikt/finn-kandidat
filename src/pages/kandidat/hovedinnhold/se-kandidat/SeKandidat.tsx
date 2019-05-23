import React, { FunctionComponent } from 'react';

import arbeidsmiljøSpørsmål from '../../../registrering/arbeidsmiljø/arbeidsmiljøSpørsmål';
import arbeidstidSpørsmål from '../../../registrering/arbeidstid/arbeidstidSpørsmål';
import fysiskeSpørsmål from '../../../registrering/fysisk/fysiskSpørsmål';
import grunnleggendeSpørsmål from '../../../registrering/grunnleggende-ferdigheter/grunnleggendeFerdigheterSpørsmål';
import Kandidat from '../../../../types/Kandidat';
import RegistrertBehov from './registrert-behov/RegistrertBehov';
import { Behovfelt } from '../../../../types/Behov';

interface Props {
    kandidat: Kandidat;
}

const SeKandidat: FunctionComponent<Props> = ({ kandidat }) => {
    return (
        <>
            <RegistrertBehov
                spørsmål={arbeidstidSpørsmål}
                svar={[kandidat[Behovfelt.ArbeidstidBehov]]}
            />
            <RegistrertBehov spørsmål={fysiskeSpørsmål} svar={kandidat[Behovfelt.FysiskeBehov]} />
            <RegistrertBehov
                spørsmål={arbeidsmiljøSpørsmål}
                svar={kandidat[Behovfelt.ArbeidsmiljøBehov]}
            />
            <RegistrertBehov
                spørsmål={grunnleggendeSpørsmål}
                svar={kandidat[Behovfelt.GrunnleggendeBehov]}
            />
        </>
    );
};

export default SeKandidat;
