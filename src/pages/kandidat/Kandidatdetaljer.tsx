import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppRoute, MatchProps } from '../../utils/paths';
import { hentKandidat, hentSkrivetilgang } from '../../api/finnKandidatApi';
import bemHelper from '../../utils/bemHelper';
import Brødsmulesti from '../../components/brødsmulesti/Brødsmulesti';
import Hovedinnhold from './hovedinnhold/Hovedinnhold';
import { Kandidat, RestKandidat, Status } from '../../types/Kandidat';
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
    const aktørId = match.params.aktorId;
    const sidenDuErPå = iEndremodus ? AppRoute.EndreKandidat : AppRoute.SeKandidat;
    const [kandidat, setKandidat] = useState<RestKandidat>({
        status: Status.LasterInn,
    });
    const [harSkrivetilgang, settSkrivetilgang] = useState<boolean>(false);
    const [slettemodalErÅpen, toggleSlettemodal] = useState<boolean>(false);

    const redirectVedUgyldigAktørId = useCallback(() => {
        const aktørIdErUgyldig = isNaN(Number(aktørId));
        if (aktørIdErUgyldig) {
            history.replace(AppRoute.Oversikt);
        }
    }, [aktørId, history]);

    const hentKandidatEllerVisFeilmelding = useCallback(async () => {
        try {
            const kandidat = await hentKandidat(aktørId);
            redirectVedUgyldigAktørId();
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
    }, [aktørId, redirectVedUgyldigAktørId]);

    const sjekkSkrivetilgang = useCallback(async () => {
        const harTilgang = await hentSkrivetilgang(aktørId);
        settSkrivetilgang(harTilgang);
    }, [aktørId]);

    useEffect(() => {
        hentKandidatEllerVisFeilmelding();
        sjekkSkrivetilgang();
    }, [hentKandidatEllerVisFeilmelding, sjekkSkrivetilgang]);

    const onKandidatChange = (endretKandidat: Kandidat) => {
        setKandidat({
            status: Status.Suksess,
            data: endretKandidat,
        });
    };

    return (
        <>
            <RouteBanner
                tittel={iEndremodus ? 'Endre kandidat' : 'Kandidat'}
                undertittel={kandidat.status === Status.Suksess ? kandidat.data.fnr : ''}
            />
            <main className={cls.block}>
                <Brødsmulesti sidenDuErPå={sidenDuErPå} aktørId={aktørId} />
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
                    feilmelding={kandidat.status === Status.Feil ? kandidat.error : undefined}
                />
            </main>
            <SlettKandidatModal
                erÅpen={slettemodalErÅpen}
                aktørId={aktørId}
                lukk={() => toggleSlettemodal(false)}
            />
        </>
    );
};

export default withRouter(Kandidatdetaljer);
