import React, { useState, useEffect, FunctionComponent } from 'react';
import { Element } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentKandidater } from '../../api/api';
import bemHelper from '../../utils/bemHelper';
import Filtrering from './filtrering/Filtrering';
import Kandidat from '../../types/Kandidat';
import Kandidatliste from './kandidatliste/Kandidatliste';
import Kolonnetitler from './kolonnetitler/Kolonnetitler';
import NyKandidatKnapp from './ny-kandidat-knapp/NyKandidatKnapp';
import PanelMedTekst from '../../components/panel-med-tekst/PanelMedTekst';
import RouteBanner from '../../components/route-banner/RouteBanner';
import './oversikt.less';
import { RouteComponentProps, withRouter } from 'react-router';
import { filtrerKandidater, hentFiltreringFraUrl } from './filtrering/filtreringslogikk';

const cls = bemHelper('oversikt');

const Oversikt: FunctionComponent<RouteComponentProps> = () => {
    const [alleKandidater, setAlleKandidater] = useState<Kandidat[]>([]);
    const [filtrerteKandidater, setFiltrerteKandidater] = useState<Kandidat[]>([]);
    const [isFetching, toggleFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<boolean>(false);

    useEffect(() => {
        hentKandidater()
            .then((kandidater: Kandidat[]) => {
                setAlleKandidater(kandidater);
                setFiltrerteKandidater(kandidater);
                toggleFetching(false);
            })
            .catch(() => {
                setFetchError(true);
            });
    }, []);

    useEffect(
        () => {
            const urlParams = location.search;
            const filtrering = hentFiltreringFraUrl(urlParams);
            const filtrerteKandidater = filtrerKandidater(alleKandidater, filtrering);
            setFiltrerteKandidater(filtrerteKandidater);
        },
        [location.href]
    );

    let kandidaterInnhold = <LasterInn />;
    if (fetchError) {
        kandidaterInnhold = <PanelMedTekst tekst="Kunne ikke hente kandidater" />;
    } else if (!isFetching) {
        kandidaterInnhold = <Kandidatliste filtrerteKandidater={filtrerteKandidater} />;
    }

    return (
        <>
            <RouteBanner tittel="Kandidatoversikt" />
            <main className={cls.block}>
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
