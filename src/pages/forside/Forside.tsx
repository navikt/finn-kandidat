import React, { FunctionComponent } from 'react';
import RouteBanner from '../../components/route-banner/RouteBanner';

import { AppRoute } from '../../utils/paths';
import bemHelper from '../../utils/bemHelper';
import blyant from './blyant.svg';
import Forsidelenke from './Forsidelenke';
import forstørrelsesglass from './forstørrelsesglass.svg';
import SlikFungererDet from './slik-fungerer-det/SlikFungererDet';
import './forside.less';

const cls = bemHelper('forside');

const Forside: FunctionComponent = () => {
    return (
        <>
            <RouteBanner tittel="Tilrettelegger'n" />
            <main className={cls.block}>
                <div className={cls.element('container')}>
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
                            tekst="Finn kandidater med tilretteleggingsbehov"
                            href={AppRoute.Oversikt}
                        />
                    </nav>
                </div>
                <SlikFungererDet />
            </main>
        </>
    );
};

export default Forside;
