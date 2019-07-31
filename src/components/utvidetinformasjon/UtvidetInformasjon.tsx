import * as React from 'react';
import classnames from 'classnames';

import InfoToggler from './InfoToggler';
import './utvidetInformasjon.less';
import EkspanderbartInnhold from './EkspanderbartInnhold';
import { Normaltekst } from 'nav-frontend-typografi';
import { FunctionComponent, useState } from 'react';

interface Props {
    åpneLabel: string;
    lukkLabel: string;
}

const UtvidetInformasjon: FunctionComponent<Props> = ({ åpneLabel, lukkLabel, children }) => {
    const [åpen, setÅpen] = useState<boolean>(false);

    const cls = classnames('utvidetInformasjon', {
        'utvidetInformasjon--apen': åpen,
    });

    return (
        <div className={cls}>
            <div className="utvidetInformasjon__toggler">
                <InfoToggler onToggle={() => setÅpen(!åpen)} åpen={åpen}>
                    <Normaltekst tag="span">{åpen ? lukkLabel : åpneLabel}</Normaltekst>
                </InfoToggler>
            </div>
            <div className="utvidetInformasjon__innhold">
                <EkspanderbartInnhold erApen={åpen}>{children}</EkspanderbartInnhold>
            </div>
        </div>
    );
};

export default UtvidetInformasjon;
