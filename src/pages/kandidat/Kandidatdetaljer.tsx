import React, { useState, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppRoute, MatchProps } from '../../utils/paths';
import { erGyldigFnr } from '../før-du-begynner/fnr-input/fnrUtils';
import { hentKandidat, hentSkrivetilgang } from '../../api/finnKandidatApi';
import bemHelper from '../../utils/bemHelper';
import Brødsmulesti from '../../components/brødsmulesti/Brødsmulesti';
import Hovedinnhold from './hovedinnhold/Hovedinnhold';
import { RestKandidat, Status, Kandidat } from '../../types/Kandidat';
import RouteBanner from '../../components/route-banner/RouteBanner';
import SistEndretOgKnapper from './sist-endret-og-knapper/SistEndretOgKnapper';
import SlettKandidatModal from './slett-kandidat-modal/SlettKandidatModal';
import './kandidatdetaljer.less';

const cls = bemHelper('kandidatdetaljer');

interface OwnProps {
    iEndremodus: boolean;
}

type Props = OwnProps & RouteComponentProps<MatchProps>;

const Kandidatdetaljer: FunctionComponent<Props> = ({ match, history, iEndremodus }) => {
    const fnr = match.params.fnr;
    const sidenDuErPå = iEndremodus ? AppRoute.EndreKandidat : AppRoute.SeKandidat;

    const [kandidat, setKandidat] = useState<RestKandidat>({
        status: Status.LasterInn,
    });

    const [harSkrivetilgang, settSkrivetilgang] = useState<boolean>(false);
    const [slettemodalErÅpen, toggleSlettemodal] = useState<boolean>(false);

    const onKandidatChange = (endretKandidat: Kandidat) => {
        setKandidat({
            status: Status.Suksess,
            data: endretKandidat,
        });
    };

    const redirectVedUgyldigFnr = () => {
        const fnrErGyldig = erGyldigFnr(fnr);
        if (!fnrErGyldig) {
            history.replace(AppRoute.Oversikt);
        }
    };

    const hentKandidatEllerVisFeilmelding = async () => {
        try {
            const kandidat = await hentKandidat(fnr);

            setKandidat({
                status: Status.Suksess,
                data: kandidat,
            });
        } catch (error) {
            setKandidat({
                status: Status.Feil,
                error:
                    'Du har enten ikke tilgang til denne kandidaten eller så finnes ikke kandidaten i systemet',
            });
        }
    };

    const sjekkSkrivetilgang = async () => {
        const harTilgang = await hentSkrivetilgang(fnr);
        settSkrivetilgang(harTilgang);
    };

    useEffect(() => {
        redirectVedUgyldigFnr();
        hentKandidatEllerVisFeilmelding();
        sjekkSkrivetilgang();
        // TODO: Fiks det underliggende problemet i stedet for å disable linting
    }, [fnr]); // eslint-disable-line

    return (
        <>
            <RouteBanner tittel={iEndremodus ? 'Endre kandidat' : 'Kandidat'} undertittel={fnr} />
            <main className={cls.block}>
                <Brødsmulesti sidenDuErPå={sidenDuErPå} fnr={fnr} />
                {kandidat.status !== Status.Feil && (
                    <SistEndretOgKnapper
                        kandidat={kandidat}
                        iEndremodus={iEndremodus}
                        harSkrivetilgang={harSkrivetilgang}
                        åpneSlettemodal={() => toggleSlettemodal(true)}
                    />
                )}
                <Hovedinnhold
                    iEndremodus={iEndremodus}
                    kandidat={kandidat}
                    setKandidat={onKandidatChange}
                />
            </main>
            <SlettKandidatModal
                erÅpen={slettemodalErÅpen}
                kandidatensFnr={fnr}
                lukk={() => toggleSlettemodal(false)}
            />
        </>
    );
};

export default withRouter(Kandidatdetaljer);
