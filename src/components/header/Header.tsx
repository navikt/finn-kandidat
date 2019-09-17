import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';

import { AppRoute } from '../../utils/paths';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import bemHelper from '../../utils/bemHelper';
import './header.less';
import { useAppContext } from '../../utils/AppContext';
import Skeleton from 'react-loading-skeleton';

const cls = bemHelper('header');

const hentSidetittel = (path: string): string => {
    switch (path.split('/')[1]) {
        case 'oversikt':
            return 'Finner’n';
        case 'for-du-begynner':
        case 'kandidat':
        case 'registrering':
            return 'Kartlegger’n';
        default:
            return 'Tilrettelegger’n';
    }
};

const Header = (props: RouteComponentProps) => {
    // TODO: Fjern: denne vises i modiadekoratøren
    const { navIdent } = useAppContext();

    return (
        <header className={cls.block}>
            <Link to={AppRoute.Forside}>
                <Sidetittel className={cls.element('tittel')}>
                    “{hentSidetittel(props.location.pathname)}”
                </Sidetittel>
            </Link>
            {navIdent || <Skeleton width={60} />}
        </header>
    );
};

export default withRouter(Header);
