import React, { useState, useEffect } from 'react';
import { Element } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';

import { hentKandidater } from '../../api/api';
import bemHelper from '../../utils/bemHelper';
import Kandidat from '../../types/Kandidat';
import Kandidatliste from './kandidatliste/Kandidatliste';
import Kolonnetitler from './kolonnetitler/Kolonnetitler';
import NyKandidatKnapp from './ny-kandidat-knapp/NyKandidatKnapp';
import RouteBanner from '../../components/route-banner/RouteBanner';
import './oversikt.less';

const cls = bemHelper('oversikt');

const Oversikt = () => {
    const [alleKandidater, setKandidater] = useState<Kandidat[]>([]);
    const [isFetching, toggleFetching] = useState<boolean>(true);

    useEffect(() => {
        hentKandidater().then((kandidater: Kandidat[]) => {
            setKandidater(kandidater);
            toggleFetching(false);
        });
    }, []);

    return (
        <>
            <RouteBanner tittel="Kandidatoversikt" />
            <main className={cls.block}>
                <aside>{/* TODO: Filtrering av kandidater */}</aside>
                <section>
                    <div className={cls.element('overKandidatene')}>
                        <Element>{alleKandidater.length} kandidater</Element>
                        <NyKandidatKnapp />
                    </div>
                    <Kolonnetitler />
                    {isFetching ? (
                        <LasterInn />
                    ) : (
                        <Kandidatliste filtrerteKandidater={alleKandidater} />
                    )}
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

export default Oversikt;
