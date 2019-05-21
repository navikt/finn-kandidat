import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import bemHelper from '../../utils/bemHelper';
import Knapp from 'nav-frontend-knapper';
import './header.less';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { AppRoute } from '../../utils/paths';

const cls = bemHelper('header');

const hentSidetittel = (path: string): string => {
    switch (path.split('/')[1]) {
        case 'oversikt':
            return 'Finner’n';
        case 'for-du-begynner':
        case 'kandidat':
            return 'Kartlegger’n';
        default:
            return 'Tilrettelegger’n';
    }
};

const Header = (props: RouteComponentProps) => {
    return (
        <header className={cls.block}>
            <Link to={AppRoute.Forside}>
                <Sidetittel className={cls.element('tittel')}>
                    “{hentSidetittel(props.location.pathname)}”
                </Sidetittel>
            </Link>

            <div className={cls.element('user')}>
                <span className={cls.element('username')}>Z991529</span>
                <Knapp mini type="standard">
                    Logg ut
                </Knapp>
            </div>
        </header>
    );
};

export default withRouter(Header);
