import React, { FunctionComponent } from 'react';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';

import bemHelper from '../../utils/bemHelper';
import Infoikon from './Infoikon';
import RouteBanner from '../../components/route-banner/RouteBanner';
import './ingenTilgang.less';

const cls = bemHelper('ingenTilgang');

const IngenTilgang: FunctionComponent = () => {
    return (
        <>
            <RouteBanner tittel="Tilretteleggingsbehov" />
            <main className={cls.block}>
                <Infoikon />
                <Systemtittel>Du har ikke tilgang til å se tilretteleggingsbehov</Systemtittel>
                <Normaltekst>
                    Dette er en tjeneste som er under testing på noen få NAV-kontorer.
                </Normaltekst>
            </main>
        </>
    );
};

export default IngenTilgang;
