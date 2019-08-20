import React, { FunctionComponent } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import Skeleton from 'react-loading-skeleton';

import { formaterDatoOgTid } from '../../../utils/datoUtils';
import { RestKandidat, Status } from '../../../types/Kandidat';
import AvbrytKnapp from './avbryt-knapp/AvbrytKnapp';
import bemHelper from '../../../utils/bemHelper';
import EndreKandidatKnapp from './endre-kandidat-knapp/EndreKandidatKnapp';

const cls = bemHelper('kandidatdetaljer');

interface Props {
    kandidat: RestKandidat;
    iEndremodus: boolean;
    harSkrivetilgang: boolean;
    åpneSlettemodal: () => void;
}

const SistEndretOgKnapper: FunctionComponent<Props> = props => {
    const { kandidat, iEndremodus, harSkrivetilgang, åpneSlettemodal } = props;

    let sistEndretTekst;
    if (kandidat.status === Status.Suksess) {
        const { sistEndret, sistEndretAv } = kandidat.data;
        if (sistEndret && sistEndretAv) {
            sistEndretTekst = <SistEndret sistEndret={sistEndret} sistEndretAv={sistEndretAv} />;
        }
    }

    return (
        <div className={cls.element('sistEndretOgKnapper')}>
            {sistEndretTekst || <Skeleton width={310} height={20} />}
            {harSkrivetilgang && (
                <div className={cls.element('knapper')}>
                    <Knapp mini onClick={åpneSlettemodal} className={cls.element('slettknapp')}>
                        Slett
                    </Knapp>
                    {kandidat.status === Status.Suksess ? (
                        iEndremodus ? (
                            <AvbrytKnapp fnr={kandidat.data.fnr} />
                        ) : (
                            <EndreKandidatKnapp fnr={kandidat.data.fnr} />
                        )
                    ) : (
                        <Skeleton width={220} height={30} />
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
