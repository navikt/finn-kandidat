import React, { FunctionComponent } from 'react';
import EndreKandidat from './endre-kandidat/EndreKandidat';
import Kandidat from '../../../types/Kandidat';
import LasterInn from './laster-inn/LasterInn';
import PanelMedTekst from '../../../components/panel-med-tekst/PanelMedTekst';
import SeKandidat from './se-kandidat/SeKandidat';

interface Props {
    kandidat?: Kandidat;
    iEndremodus: boolean;
    setKandidat: (kandidat: Kandidat) => void;
    feilmelding?: string;
}

const Hovedinnhold: FunctionComponent<Props> = props => {
    const { kandidat, iEndremodus, setKandidat, feilmelding } = props;
    if (kandidat) {
        return iEndremodus ? (
            <EndreKandidat kandidat={kandidat} onKandidatChange={setKandidat} />
        ) : (
            <SeKandidat kandidat={kandidat} />
        );
    }

    if (feilmelding) {
        return <PanelMedTekst tekst={feilmelding} />;
    }

    return <LasterInn />;
};

export default Hovedinnhold;
