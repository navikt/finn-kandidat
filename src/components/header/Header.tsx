import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import bemHelper from '../../utils/bemHelper';
import Knapp from 'nav-frontend-knapper';
import './header.less';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/paths';

const cls = bemHelper('header');

const Header = () => (
    <header className={cls.block}>
        <Link to={AppRoute.Forside}>
            <Sidetittel className={cls.element('tittel')}>“Tilretteleggingsfinnern”</Sidetittel>
        </Link>

        <div className={cls.element('user')}>
            <span className={cls.element('username')}>Z991529</span>
            <Knapp mini type="standard">
                Logg ut
            </Knapp>
        </div>
    </header>
);

export default Header;
