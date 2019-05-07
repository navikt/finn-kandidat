import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../../utils/paths';
import AddCircle from '../../../components/ikoner/AddCircle';
import bemHelper from '../../../utils/bemHelper';
import './nyKandidatKnapp.less';

const cls = bemHelper('nyKandidatKnapp');

const NyKandidatKnapp = () => (
    <Link
        className={cls.classNames(cls.block, 'knapp', 'knapp--hoved', 'knapp--mini')}
        to={AppRoute.FørDuBegynner}
    >
        <AddCircle className={cls.element('ikon')} />
        Ny kandidat
    </Link>
);

export default NyKandidatKnapp;
