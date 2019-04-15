import React from 'react';
import { AppRoute } from '../../utils/paths';
import { Link } from 'react-router-dom';
import bemHelper from '../../utils/bemHelper';
import RouteBanner from '../route-banner/RouteBanner';
import './oversikt.less';

const cls = bemHelper('oversikt');

const Oversikt = () => (
    <>
        <RouteBanner tittel="Kandidatoversikt" />

        <main className={cls.block}>
            <h3>Oversikt</h3>
            <Link to={AppRoute.REGISTRERING}>Ny kandidat</Link>
        </main>
    </>
);

export default Oversikt;
