import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import { RouteComponentProps, withRouter } from 'react-router';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Skeleton from 'react-loading-skeleton';

import { AppRoute } from '../../utils/paths';
import { hentFilterFraUrl } from './filtrering/filtreringslogikk';
import { hentKandidater } from '../../api/finnKandidatApi';
import { RestKandidater, Status } from '../../types/Kandidat';
import { loggKlikkPåKandidat } from '../../api/målinger';
import bemHelper from '../../utils/bemHelper';
import Brødsmulesti from '../../components/brødsmulesti/Brødsmulesti';
import Filtrering from './filtrering/Filtrering';
import Kandidatliste from './kandidatliste/Kandidatliste';
import KandidatListeSkeleton from './kandidatliste/KandidatListeSkeleton';
import Kolonnetitler from './kolonnetitler/Kolonnetitler';
import NyKandidatKnapp from './ny-kandidat-knapp/NyKandidatKnapp';
import PanelMedTekst from '../../components/panel-med-tekst/PanelMedTekst';
import RouteBanner from '../../components/route-banner/RouteBanner';
import useFiltrerteKandidater from './useFiltrerteKandidater';
import './oversikt.less';
import { hentUnikeKontor } from './filtrering/enhetsfilter/kandidatenesKontor';

const cls = bemHelper('oversikt');

const Oversikt: FunctionComponent<RouteComponentProps> = ({ location }) => {
    const [alleKandidater, setAlleKandidater] = useState<RestKandidater>({
        status: Status.LasterInn,
    });

    const { filtrerteKandidater, antallValgteKriterier } = useFiltrerteKandidater(
        alleKandidater,
        location
    );

    const onClickKandidat = () => {
        const aktivtFilter = hentFilterFraUrl(location.search);
        loggKlikkPåKandidat(aktivtFilter);
    };

    const hentAlleKandidater = async () => {
        try {
            const kandidater = await hentKandidater();
            setAlleKandidater({
                status: Status.Suksess,
                data: kandidater,
            });
        } catch (error) {
            setAlleKandidater({
                status: Status.Feil,
                error: 'Kunne ikke hente kandidater',
            });
        }
    };

    useEffect(() => {
        hentAlleKandidater();
    }, []);

    let kandidaterInnhold = <LasterInn />;

    if (alleKandidater.status === Status.Suksess) {
        kandidaterInnhold = (
            <Kandidatliste
                kandidater={filtrerteKandidater}
                antallValgteKriterier={antallValgteKriterier}
                onClickKandidat={onClickKandidat}
            />
        );
    } else if (alleKandidater.status === Status.LasterInn) {
        kandidaterInnhold = <KandidatListeSkeleton />;
    } else if (alleKandidater.status === Status.Feil) {
        kandidaterInnhold = <PanelMedTekst tekst={alleKandidater.error} />;
    }

    const antallKandidater =
        alleKandidater.status === Status.Suksess ? (
            `${filtrerteKandidater.length} kandidater`
        ) : (
            <Skeleton width={105} />
        );

    const enheter = useMemo(() => {
        return alleKandidater.status === Status.Suksess
            ? hentUnikeKontor(alleKandidater.data)
            : new Set<string>();
    }, [alleKandidater]);

    return (
        <>
            <RouteBanner tittel="Finn kandidater med tilretteleggingsbehov" />
            <main className={cls.block}>
                <Brødsmulesti sidenDuErPå={AppRoute.Oversikt} />
                <div className={cls.element('filterOgKandidatliste')}>
                    <aside className={cls.element('filter')}>
                        <Filtrering enheter={enheter} />
                    </aside>
                    <section className={cls.element('kandidatliste')}>
                        <div className={cls.element('antallOgKnapp')}>
                            <Element>{antallKandidater}</Element>
                            <NyKandidatKnapp />
                        </div>
                        <Kolonnetitler />
                        {kandidaterInnhold}
                    </section>
                </div>
            </main>
        </>
    );
};

const LasterInn = () => (
    <div aria-label="Laster inn kandidater" className={cls.element('kandidaterSpinner')}>
        <NavFrontendSpinner type="L" />
    </div>
);

export default withRouter(Oversikt);
