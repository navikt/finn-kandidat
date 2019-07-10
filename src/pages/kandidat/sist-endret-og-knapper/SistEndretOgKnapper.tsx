import React, { FunctionComponent } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';

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

    return (
        <div className={cls.element('sistEndretOgKnapper')}>
            {kandidat.sistEndret && kandidat.sistEndretAv && (
                <SistEndret sistEndret={kandidat.sistEndret} sistEndretAv={kandidat.sistEndretAv} />
            )}
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

const SistEndret = ({ sistEndret, sistEndretAv }: { sistEndret: Date; sistEndretAv: string }) => {
    const lenkeTilBrukerprofil = `https://navno.sharepoint.com/sites/intranett/SitePages/search.aspx?q=${sistEndretAv}`;

    return (
        <span>
            <span>Sist endret {formaterDatoOgTid(sistEndret)} av </span>
            <Lenke className={cls.element('sistEndret')} href={lenkeTilBrukerprofil}>
                {sistEndretAv}
            </Lenke>
        </span>
    );
};

export default SistEndretOgKnapper;
