import React, { FunctionComponent } from 'react';
import EndreKandidat from './endre-kandidat/EndreKandidat';
import { Kandidat, RestKandidat, Status } from '../../../types/Kandidat';
import LasterInn from './laster-inn/LasterInn';
import SeKandidat from './se-kandidat/SeKandidat';

interface Props {
    kandidat: RestKandidat;
    iEndremodus: boolean;
    setKandidat: (kandidat: Kandidat) => void;
    feilmelding?: string;
}

const Hovedinnhold: FunctionComponent<Props> = ({ kandidat, iEndremodus, setKandidat }) => {
    if (iEndremodus) {
        return kandidat.status === Status.Suksess ? (
            <EndreKandidat kandidat={kandidat.data} onKandidatChange={setKandidat} />
        ) : (
            <LasterInn />
        );
    }

    return <SeKandidat kandidat={kandidat} />;
};

export default Hovedinnhold;
