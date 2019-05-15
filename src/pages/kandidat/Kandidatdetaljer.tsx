import React, { useState, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppRoute, MatchProps } from '../../utils/paths';
import { formaterFnr, erGyldigFnr } from '../før-du-begynner/fnr-input/fnrUtils';
import { hentKandidat, hentSkrivetilgang } from '../../api/api';
import bemHelper from '../../utils/bemHelper';
import Brødsmulesti from '../../components/brødsmulesti/Brødsmulesti';
import EndreKandidat from './endre-kandidat/EndreKandidat';
import EndreKandidatKnapp from './EndreKandidatKnapp';
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

    const [kandidat, setKandidat] = useState<Kandidat | undefined>(undefined);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);
    const [harSkrivetilgang, settSkrivetilgang] = useState<boolean>(false);

    useEffect(
        () => {
            redirectVedUgyldigFnr();
            hentKandidatEllerVisFeilmelding();
            sjekkSkrivetilgang();
        },
        [fnr]
    );

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
            <RouteBanner tittel="Kandidat" undertittel={formaterFnr(fnr)} />
            <main className={cls.block}>
                <div className={cls.element('handlingspanel')}>
                    <Brødsmulesti
                        sidenDuErPå={iEndremodus ? AppRoute.EndreKandidat : AppRoute.SeKandidat}
                        fnr={fnr}
                    />
                    {harSkrivetilgang && <EndreKandidatKnapp fnr={fnr} iEndremodus={iEndremodus} />}
                </div>

                {renderHovedinnhold()}
            </main>
        </>
    );
};

export default withRouter(Kandidatdetaljer);
