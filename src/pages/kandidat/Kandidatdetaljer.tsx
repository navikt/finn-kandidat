import React, { useState, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppRoute, MatchProps } from '../../utils/paths';
import { formaterDatoOgTid } from '../../utils/datoUtils';
import { formaterFnr, erGyldigFnr } from '../før-du-begynner/fnr-input/fnrUtils';
import { hentKandidat, hentSkrivetilgang } from '../../api/api';
import AvbrytKnapp from './avbryt-knapp/AvbrytKnapp';
import bemHelper from '../../utils/bemHelper';
import Brødsmulesti from '../../components/brødsmulesti/Brødsmulesti';
import EndreKandidat from './endre-kandidat/EndreKandidat';
import EndreKandidatKnapp from './endre-kandidat-knapp/EndreKandidatKnapp';
import Kandidat from '../../types/Kandidat';
import LasterInn from './laster-inn/LasterInn';
import PanelMedTekst from '../../components/panel-med-tekst/PanelMedTekst';
import RouteBanner from '../../components/route-banner/RouteBanner';
import SeKandidat from './se-kandidat/SeKandidat';
import './kandidatdetaljer.less';

const cls = bemHelper('kandidatdetaljer');

interface OwnProps {
    iEndremodus: boolean;
}

type Props = OwnProps & RouteComponentProps<MatchProps>;

const Kandidatdetaljer: FunctionComponent<Props> = ({ match, history, iEndremodus }) => {
    const fnr = match.params.fnr;
    const sidenDuErPå = iEndremodus ? AppRoute.EndreKandidat : AppRoute.SeKandidat;

    const [kandidat, setKandidat] = useState<Kandidat | undefined>(undefined);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);
    const [harSkrivetilgang, settSkrivetilgang] = useState<boolean>(false);

    useEffect(() => {
        redirectVedUgyldigFnr();
        hentKandidatEllerVisFeilmelding();
        sjekkSkrivetilgang();
    }, [fnr]);

    const redirectVedUgyldigFnr = () => {
        const fnrErGyldig = erGyldigFnr(fnr);
        if (!fnrErGyldig) {
            history.replace(AppRoute.Oversikt);
        }
    };

    const hentKandidatEllerVisFeilmelding = async () => {
        try {
            const kandidat = await hentKandidat(fnr);
            setKandidat(kandidat);
        } catch (error) {
            setFeilmelding(
                'Du har enten ikke tilgang til denne kandidaten eller så finnes ikke kandidaten i systemet'
            );
        }
    };

    const sjekkSkrivetilgang = async () => {
        const harTilgang = await hentSkrivetilgang(fnr);
        settSkrivetilgang(harTilgang);
    };

    const renderSistEndret = () =>
        kandidat && kandidat.sistEndret
            ? `Sist endret ${formaterDatoOgTid(kandidat.sistEndret)} av ${kandidat.sistEndretAv}`
            : null;

    const renderEndreModusKnapp = () => {
        if (harSkrivetilgang) {
            return iEndremodus ? <AvbrytKnapp fnr={fnr} /> : <EndreKandidatKnapp fnr={fnr} />;
        }
    };

    const renderHovedinnhold = () => {
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

    return (
        <>
            <RouteBanner
                tittel={iEndremodus ? 'Endre kandidat' : 'Kandidat'}
                undertittel={formaterFnr(fnr)}
            />
            <main className={cls.block}>
                <Brødsmulesti sidenDuErPå={sidenDuErPå} fnr={fnr} />

                <div className={cls.element('sistEndretOgKnapper')}>
                    {renderSistEndret()}
                    {renderEndreModusKnapp()}
                </div>

                {renderHovedinnhold()}
            </main>
        </>
    );
};

export default withRouter(Kandidatdetaljer);
