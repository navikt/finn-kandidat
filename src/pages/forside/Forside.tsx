import React, { FunctionComponent } from 'react';
import RouteBanner from '../../components/route-banner/RouteBanner';

import { AppRoute } from '../../utils/paths';
import bemHelper from '../../utils/bemHelper';
import blyant from './blyant.svg';
import Forsidelenke from './Forsidelenke';
import forstørrelsesglass from './forstørrelsesglass.svg';
import './forside.less';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

const cls = bemHelper('forside');

const Forside: FunctionComponent = () => {
    return (
        <>
            <RouteBanner tittel="Finn kandidater med tilretteleggingsbehov" />
            <main className={cls.block}>
                <span className={cls.element('introduksjon')}>
                    Her kan du registrere tilretteleggingsbehovene til en kandidat og finne
                    kandidater med konkrete behov
                </span>
                <nav className={cls.element('navigasjon')}>
                    <Forsidelenke
                        ikon={blyant}
                        tekst="Registrer eller endre tilretteleggingsbehov til kandidat"
                        href={AppRoute.FørDuBegynner}
                    />
                    <Forsidelenke
                        ikon={forstørrelsesglass}
                        tekst="Finn kandidat"
                        href={AppRoute.Oversikt}
                    />
                </nav>
                <Ekspanderbartpanel border tittel="Sånn fungerer det">
                    Det fungerer bra!
                </Ekspanderbartpanel>
            </main>
        </>
    );
};

export default Forside;
