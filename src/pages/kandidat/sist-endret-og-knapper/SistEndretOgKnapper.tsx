import React, { FunctionComponent } from 'react';
import { Knapp } from 'nav-frontend-knapper';

import { formaterDatoOgTid } from '../../../utils/datoUtils';
import AvbrytKnapp from './avbryt-knapp/AvbrytKnapp';
import bemHelper from '../../../utils/bemHelper';
import EndreKandidatKnapp from './endre-kandidat-knapp/EndreKandidatKnapp';
import Kandidat from '../../../types/Kandidat';

const cls = bemHelper('kandidatdetaljer');

interface Props {
    kandidat: Kandidat;
    iEndremodus: boolean;
    harSkrivetilgang: boolean;
    åpneSlettemodal: () => void;
}

const SistEndretOgKnapper: FunctionComponent<Props> = props => {
    const { kandidat, iEndremodus, harSkrivetilgang, åpneSlettemodal } = props;

    const renderSistEndret = () =>
        kandidat && kandidat.sistEndret
            ? `Sist endret ${formaterDatoOgTid(kandidat.sistEndret)} av ${kandidat.sistEndretAv}`
            : null;

    return (
        <div className={cls.element('sistEndretOgKnapper')}>
            {renderSistEndret()}
            {harSkrivetilgang && (
                <div className={cls.element('knapper')}>
                    <Knapp mini onClick={åpneSlettemodal} className={cls.element('slettknapp')}>
                        Slett
                    </Knapp>
                    {iEndremodus ? (
                        <AvbrytKnapp fnr={kandidat.fnr} />
                    ) : (
                        <EndreKandidatKnapp fnr={kandidat.fnr} />
                    )}
                </div>
            )}
        </div>
    );
};

export default SistEndretOgKnapper;
