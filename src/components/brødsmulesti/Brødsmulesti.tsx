import React, { FunctionComponent, Fragment } from 'react';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../utils/paths';
import byggSti from './byggSti';
import bemHelper from '../../utils/bemHelper';
import './brødsmulesti.less';

const cls = bemHelper('brødsmulesti');

interface Props {
    sidenDuErPå: AppRoute;
    aktørId?: string;
}

const Brødsmulesti: FunctionComponent<Props> = ({ sidenDuErPå, aktørId }) => {
    const sti = byggSti(sidenDuErPå, aktørId);

    return (
        <nav className={cls.block}>
            {sti.map((side, index) => {
                const erSisteSide = index === sti.length - 1;
                const sideToRender = erSisteSide ? (
                    <span className={cls.element('side')}>{side.navn}</span>
                ) : (
                    <Link to={side.href} className={cls.element('side', 'tidligere')}>
                        {side.navn}
                    </Link>
                );

                return (
                    <Fragment key={side.navn}>
                        {sideToRender}
                        {!erSisteSide && <HoyreChevron />}
                    </Fragment>
                );
            })}
        </nav>
    );
};

export default Brødsmulesti;
