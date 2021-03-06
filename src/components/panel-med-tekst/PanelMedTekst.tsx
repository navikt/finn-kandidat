import React, { FunctionComponent } from 'react';
import { Panel } from 'nav-frontend-paneler';

import bemHelper from '../../utils/bemHelper';
import './panelMedTekst.less';
import { Undertittel } from 'nav-frontend-typografi';

const cls = bemHelper('panelMedTekst');

interface Props {
    tekst: string;
}

const PanelMedTekst: FunctionComponent<Props> = ({ tekst }) => (
    <Panel border className={cls.block}>
        <Undertittel>{tekst}</Undertittel>
    </Panel>
);

export default PanelMedTekst;
