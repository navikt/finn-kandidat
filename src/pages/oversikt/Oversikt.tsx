import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { Element } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';

import { hentKandidater } from '../../api/api';
import bemHelper from '../../utils/bemHelper';
import IngenKandidater from './ingen-kandidater/IngenKandidater';
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
    const [fetchError, setFetchError] = useState<boolean>(false);

    useEffect(() => {
        hentKandidater()
            .then((kandidater: Kandidat[]) => {
                setKandidater(kandidater);
                toggleFetching(false);
            })
            .catch((response: AxiosResponse) => {
                setFetchError(true);
            });
    }, []);

    let kandidaterInnhold = <LasterInn />;
    if (fetchError) {
        kandidaterInnhold = <IngenKandidater årsak="Kunne ikke hente kandidater" />;
    } else if (!isFetching) {
        kandidaterInnhold = <Kandidatliste filtrerteKandidater={alleKandidater} />;
    }

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

export default Oversikt;
