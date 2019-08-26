import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { AppRoute, hentRoute } from '../../../../utils/paths';
import bemHelper from '../../../../utils/bemHelper';
import './endreKandidatKnapp.less';

const cls = bemHelper('endreKandidatKnapp');
const knappCls = bemHelper('knapp');

interface Props {
    aktørId: string;
}

const EndreKandidatKnapp: FunctionComponent<Props> = ({ aktørId }) => (
    <Link
        className={classnames(
            cls.block,
            knappCls.block,
            knappCls.modifier('hoved'),
            knappCls.modifier('mini')
        )}
        to={hentRoute(AppRoute.EndreKandidat, aktørId)}
    >
        Endre
    </Link>
);

export default EndreKandidatKnapp;
