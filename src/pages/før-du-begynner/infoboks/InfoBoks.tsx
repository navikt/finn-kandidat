import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import veileder from './veileder.svg';
import { Undertittel } from 'nav-frontend-typografi';
import './infoboks.less';

const InfoBoks = () => {
    return (
        <Veilederpanel type={'plakat'} kompakt svg={<img src={veileder} />}>
            <Undertittel>Viktig informasjon</Undertittel>
            <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>
                    Ut sollicitudin leo quis iaculis accumsan. Sed facilisis quam et mauris
                    bibendum, nec hendrerit ipsum sagittis.
                </li>
                <li>Quisque neque arcu, posuere dictum suscipit ac, volutpat eget nulla.</li>
            </ul>
        </Veilederpanel>
    );
};

export default InfoBoks;
