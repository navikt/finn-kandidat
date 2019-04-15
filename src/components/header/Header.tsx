import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import bemHelper from '../../utils/bemHelper';
import Knapp from 'nav-frontend-knapper';
import './header.less';

const cls = bemHelper('header');

const Header = () => (
    <header className={cls.block}>
        <Sidetittel className={cls.element('title')}>“Tilretteleggingsfinnern”</Sidetittel>

        <div className={cls.element('user')}>
            <span className={cls.element('username')}>Z991529</span>
            <Knapp mini type="standard">
                Logg ut
            </Knapp>
        </div>
    </header>
);

export default Header;
