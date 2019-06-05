import React, { useState, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppRoute, MatchProps } from '../../utils/paths';
import { formaterFnr, erGyldigFnr } from '../før-du-begynner/fnr-input/fnrUtils';
import { hentKandidat, hentSkrivetilgang } from '../../api/finnKandidatApi';
import bemHelper from '../../utils/bemHelper';
import Brødsmulesti from '../../components/brødsmulesti/Brødsmulesti';
import Hovedinnhold from './hovedinnhold/Hovedinnhold';
import Kandidat from '../../types/Kandidat';
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

    const [kandidat, setKandidat] = useState<Kandidat | undefined>(undefined);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);
    const [harSkrivetilgang, settSkrivetilgang] = useState<boolean>(false);
    const [slettemodalErÅpen, toggleSlettemodal] = useState<boolean>(false);

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

    return (
        <>
            <RouteBanner
                tittel={iEndremodus ? 'Endre kandidat' : 'Kandidat'}
                undertittel={formaterFnr(fnr)}
            />
            <main className={cls.block}>
                <Brødsmulesti sidenDuErPå={sidenDuErPå} fnr={fnr} />
                {kandidat && !feilmelding && (
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
                    setKandidat={setKandidat}
                    feilmelding={feilmelding}
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
