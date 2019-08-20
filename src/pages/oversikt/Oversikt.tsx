import React, { useState, useEffect, FunctionComponent, useCallback } from 'react';
import { Element } from 'nav-frontend-typografi';
import { RouteComponentProps, withRouter } from 'react-router';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Skeleton from 'react-loading-skeleton';

import { AppRoute } from '../../utils/paths';
import { ArbeidstidBehov } from '../../types/Behov';
import {
    filtrerKandidater,
    hentFilterFraUrl,
    tellKandidatensMatchendeKriterier,
    tilFiltrertKandidat,
    FiltrertKandidat,
} from './filtrering/filtreringslogikk';
import { hentKandidater } from '../../api/finnKandidatApi';
import { Kandidat, RestKandidater, Status } from '../../types/Kandidat';
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
import './oversikt.less';

const cls = bemHelper('oversikt');

const sorterPåMatchendeKriterier = (a: FiltrertKandidat, b: FiltrertKandidat) =>
    b.matchendeKriterier.length - a.matchendeKriterier.length;

const Oversikt: FunctionComponent<RouteComponentProps> = props => {
    const [alleKandidater, setAlleKandidater] = useState<RestKandidater>({
        status: Status.LasterInn,
    });

    const [filtrerteKandidater, setFiltrerteKandidater] = useState<FiltrertKandidat[]>([]);
    const [antallValgteKriterier, setAntallValgteKriterier] = useState<number>(0);

    const brukKandidatfilter = useCallback((kandidater: Kandidat[], urlParams: string) => {
        const filter = hentFilterFraUrl(urlParams);

        const filtrerteKandidater = filtrerKandidater(kandidater, filter)
            .map(tilFiltrertKandidat)
            .map(tellKandidatensMatchendeKriterier(filter))
            .sort(sorterPåMatchendeKriterier);

        const { arbeidstidBehov, ...andreFiltre } = filter;

        setFiltrerteKandidater(filtrerteKandidater);
        setAntallValgteKriterier(summerValgteKriterier(arbeidstidBehov, andreFiltre));
    }, []);

    const summerValgteKriterier = (
        arbeidstidFilter: ArbeidstidBehov[],
        filtreUtenomArbeidstid: Object
    ) => {
        const antallArbeidstidkriterierSomPasserKandidat = arbeidstidFilter.length > 0 ? 1 : 0;
        const antallAndreKriterier = Object.values(filtreUtenomArbeidstid).flat().length;

        return antallArbeidstidkriterierSomPasserKandidat + antallAndreKriterier;
    };

    const hentAlleKandidater = () => {
        hentKandidater()
            .then((kandidater: Kandidat[]) => {
                setAlleKandidater({
                    status: Status.Suksess,
                    data: kandidater,
                });
            })
            .catch(() => {
                setAlleKandidater({
                    status: Status.Feil,
                    error: 'Kunne ikke hente kandidater',
                });
            });
    };

    const onClickKandidat = () => {
        const urlParams = props.location.search;
        const aktivtFilter = hentFilterFraUrl(urlParams);
        loggKlikkPåKandidat(aktivtFilter);
    };

    useEffect(hentAlleKandidater, []);
    useEffect(() => {
        brukKandidatfilter(
            alleKandidater.status === Status.Suksess ? alleKandidater.data : [],
            props.location.search
        );
    }, [brukKandidatfilter, alleKandidater, props.location.search]);

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

    return (
        <>
            <RouteBanner tittel="Finn kandidater med tilretteleggingsbehov" />
            <main className={cls.block}>
                <Brødsmulesti sidenDuErPå={AppRoute.Oversikt} />
                <div className={cls.element('filterOgKandidatliste')}>
                    <aside className={cls.element('filter')}>
                        <Filtrering />
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
