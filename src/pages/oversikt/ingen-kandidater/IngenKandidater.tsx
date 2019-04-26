import React from 'react';
import Panel from 'nav-frontend-paneler';
import bemHelper from '../../../utils/bemHelper';
import './ingenKandidater.less';

const cls = bemHelper('ingenKandidater');

const IngenKandidater = () => (
    <Panel border className={cls.block}>
        Ingen kandidater å vise
    </Panel>
);

export default IngenKandidater;
