import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { hentRoute, AppRoute } from '../../../../utils/paths';
import bemHelper from '../../../../utils/bemHelper';
import './avbrytKnapp.less';

const cls = bemHelper('avbrytKnapp');
const knappCls = bemHelper('knapp');

interface Props {
    aktørId: string;
}

const AvbrytKnapp: FunctionComponent<Props> = ({ aktørId }) => (
    <Link
        className={classnames(
            cls.block,
            knappCls.block,
            knappCls.modifier('flat'),
            knappCls.modifier('mini')
        )}
        to={hentRoute(AppRoute.SeKandidat, aktørId)}
    >
        Avbryt
    </Link>
);

export default AvbrytKnapp;
