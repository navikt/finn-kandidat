import React, { FunctionComponent } from 'react';
import './IngenKandidater.less';
import fjell from './fjell.svg';
import { Systemtittel } from 'nav-frontend-typografi';
import bemHelper from '../../../utils/bemHelper';

interface Props {
    årsak: string;
}

const cls = bemHelper('ingenKandidater');

const IngenKandidater: FunctionComponent<Props> = ({ årsak }) => {
    return (
        <div className={cls.block}>
            <img src={fjell} alt="fjell" className={cls.element('illustrasjon')} />
            <Systemtittel>{årsak}</Systemtittel>
            <p>Prøv igjen med andre søkekriterier</p>
        </div>
    );
};

export default IngenKandidater;
