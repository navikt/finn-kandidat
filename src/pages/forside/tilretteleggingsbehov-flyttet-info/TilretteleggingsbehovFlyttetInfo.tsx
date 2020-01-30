import React, { FunctionComponent } from 'react';
import Alertstripe from 'nav-frontend-alertstriper';

import bemHelper from '../../../utils/bemHelper';
import { Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import './tilretteleggingsbehovFlyttetInfo.less';

const cls = bemHelper('tilretteleggingsbehovFlyttetInfo');

const TilretteleggingsbehovFlyttetInfo: FunctionComponent = () => {
    const url = window.location.href.includes('app-q0')
        ? 'https://app-q0.adeo.no/veilarbpersonflatefs/'
        : 'https://app.adeo.no/veilarbpersonflatefs/';

    return (
        <Alertstripe type="advarsel" className={cls.block}>
            <Element>Vi har flyttet tilretteleggingsbehovene</Element> Fra nå av skal du fylle inn
            tilretteleggingsbehov under <b>Detaljer</b> i <b>Aktivitsplanen</b>.
            <p>
                <Lenke href={url}>
                    Gå til enhetens oversikt og velg bruker for å registrere tilretteleggingbehov.
                </Lenke>
            </p>
        </Alertstripe>
    );
};

export default TilretteleggingsbehovFlyttetInfo;
