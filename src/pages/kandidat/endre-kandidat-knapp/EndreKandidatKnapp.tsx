import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { hentRoute, AppRoute } from '../../../utils/paths';
import bemHelper from '../../../utils/bemHelper';
import './endreKandidatKnapp.less';

const cls = bemHelper('endreKandidatKnapp');
const knappCls = bemHelper('knapp');

interface Props {
    fnr: string;
}

const EndreKandidatKnapp: FunctionComponent<Props> = ({ fnr }) => (
    <Link
        className={classnames(
            cls.block,
            knappCls.block,
            knappCls.modifier('hoved'),
            knappCls.modifier('mini')
        )}
        to={hentRoute(AppRoute.EndreKandidat, fnr)}
    >
        Endre
    </Link>
);

export default EndreKandidatKnapp;
