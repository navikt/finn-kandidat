import React, { useState, useEffect, FunctionComponent } from 'react';
import { Element } from 'nav-frontend-typografi';
import { RouteComponentProps, withRouter } from 'react-router';
import NavFrontendSpinner from 'nav-frontend-spinner';

import { AppRoute } from '../../utils/paths';
import {
    filtrerKandidater,
    hentFiltreringFraUrl,
    tellKandidatensMatchendeKriterier,
    initMatchendeKriterier,
    FiltrertKandidat,
} from './filtrering/filtreringslogikk';
import { ArbeidstidBehov } from '../../types/Behov';
import { hentKandidater } from '../../api/finnKandidatApi';
import { loggKlikkPåKandidat } from '../../api/målinger';
import bemHelper from '../../utils/bemHelper';
import Brødsmulesti from '../../components/brødsmulesti/Brødsmulesti';
import Filtrering from './filtrering/Filtrering';
import Kandidat from '../../types/Kandidat';
import Kandidatliste from './kandidatliste/Kandidatliste';
import Kolonnetitler from './kolonnetitler/Kolonnetitler';
import NyKandidatKnapp from './ny-kandidat-knapp/NyKandidatKnapp';
import PanelMedTekst from '../../components/panel-med-tekst/PanelMedTekst';
import RouteBanner from '../../components/route-banner/RouteBanner';
import './oversikt.less';

const cls = bemHelper('oversikt');

const sorterPåMatchendeKriterier = (a: FiltrertKandidat, b: FiltrertKandidat) =>
    b.matchendeKriterier.length - a.matchendeKriterier.length;

const Oversikt: FunctionComponent<RouteComponentProps> = () => {
    const [alleKandidater, setAlleKandidater] = useState<Kandidat[]>([]);
    const [filtrerteKandidater, setFiltrerteKandidater] = useState<FiltrertKandidat[]>([]);
    const [antallValgteKriterier, setAntallValgteKriterier] = useState<number>(0);
    const [isFetching, toggleFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<boolean>(false);

    const brukKandidatfilter = (kandidater: Kandidat[]) => {
        const urlParams = location.search;
        const filtrering = hentFiltreringFraUrl(urlParams);
        const filtrerteKandidater = filtrerKandidater(kandidater, filtrering)
            .map(initMatchendeKriterier)
            .map(tellKandidatensMatchendeKriterier(filtrering))
            .sort(sorterPåMatchendeKriterier);

        const { arbeidstidBehov, ...andreFiltre } = filtrering;

        setFiltrerteKandidater(filtrerteKandidater);
        setAntallValgteKriterier(summerValgteKriterier(arbeidstidBehov, andreFiltre));
    };

    const summerValgteKriterier = (
        arbeidstidFilter: ArbeidstidBehov[],
        filtreUtenomArbeidstid: Object
    ) => {
        const antallFiltreUtenomArbeidstid = Object.values(filtreUtenomArbeidstid).flat().length;
        const antallArbeidstidFiltre = arbeidstidFilter.length > 0 ? 1 : 0;

        return antallFiltreUtenomArbeidstid + antallArbeidstidFiltre;
    };

    const hentAlleKandidater = () => {
        hentKandidater()
            .then((kandidater: Kandidat[]) => {
                toggleFetching(false);

                setAlleKandidater(kandidater);
                brukKandidatfilter(kandidater);
            })
            .catch(() => {
                setFetchError(true);
            });
    };

    const onClickKandidat = () => {
        const urlParams = location.search;
        const filtrering = hentFiltreringFraUrl(urlParams);
        loggKlikkPåKandidat(filtrering);
    };

    useEffect(hentAlleKandidater, []);
    useEffect(() => brukKandidatfilter(alleKandidater), [location.href]);

    let kandidaterInnhold = <LasterInn />;
    if (fetchError) {
        kandidaterInnhold = <PanelMedTekst tekst="Kunne ikke hente kandidater" />;
    } else if (!isFetching) {
        kandidaterInnhold = (
            <Kandidatliste
                antallValgteKriterier={antallValgteKriterier}
                filtrerteKandidater={filtrerteKandidater}
                onClickKandidat={onClickKandidat}
            />
        );
    }

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
                            <Element>{filtrerteKandidater.length} kandidater</Element>
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
