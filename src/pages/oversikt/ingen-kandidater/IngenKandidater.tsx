import React from 'react';
import Panel from 'nav-frontend-paneler';
import bemHelper from '../../../utils/bemHelper';
import './ingenKandidater.less';

const cls = bemHelper('ingenKandidater');

interface Props {
    årsak: string;
}

const IngenKandidater = ({ årsak }: Props) => (
    <Panel border className={cls.block}>
        {årsak}
    </Panel>
);

export default IngenKandidater;
