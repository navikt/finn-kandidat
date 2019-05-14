import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { hentRoute, AppRoute } from '../../utils/paths';
import bemHelper from '../../utils/bemHelper';

const cls = bemHelper('knapp');

interface Props {
    fnr: string;
    iEndremodus: boolean;
}

const EndreKandidatKnapp: FunctionComponent<Props> = ({ fnr, iEndremodus }) => {
    if (iEndremodus) {
        return (
            <Link
                className={classnames(cls.block, cls.modifier('flat'), cls.modifier('mini'))}
                to={hentRoute(AppRoute.SeKandidat, fnr)}
            >
                Avbryt
            </Link>
        );
    }

    return (
        <Link
            className={classnames(cls.block, cls.modifier('hoved'), cls.modifier('mini'))}
            to={hentRoute(AppRoute.EndreKandidat, fnr)}
        >
            Endre
        </Link>
    );
};

export default EndreKandidatKnapp;
