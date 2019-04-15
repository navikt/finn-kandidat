import React from 'react';
import { AppRoute } from '../../utils/paths';
import bemHelper from '../../utils/bemHelper';
import RouteBanner from '../route-banner/RouteBanner';
import Tilbake from '../tilbake/Tilbake';
import './registrering.less';

const cls = bemHelper('registrering');

const Registrering = () => (
    <>
        <RouteBanner tittel="Kandidat" undertittel="121250 12345" />

        <main className={cls.block}>
            <Tilbake til={AppRoute.OVERSIKT} />
            <h3>Registrering</h3>
        </main>
    </>
);

export default Registrering;
