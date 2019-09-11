import NAVSPA from '@navikt/navspa';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { aktørIdFraUrl, AppRoute, hentRoute, MatchProps } from '../../utils/paths';
import { hentAktørId, hentFnr } from '../../api/finnKandidatApi';
import { DecoratorProps } from './internmenyTypes';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

const Internmeny: FunctionComponent<RouteComponentProps<MatchProps>> = props => {
    const aktørId = aktørIdFraUrl(props.location.pathname);
    const [fnr, setFnr] = useState<string>('');

    useEffect(() => {
        if (!aktørId) return;

        const hentOgSettFnr = async () => {
            // TODO: Bruke aktørregister direkte her
            try {
                const respons = await hentFnr(aktørId);
                setFnr(respons.data);
            } catch (error) {
                setFnr('');
            }
        };
        hentOgSettFnr();
    }, [aktørId]);

    return (
        <InternflateDecorator
            appname={'“Tilrettelegger’n”'}
            fnr={fnr}
            enhet="0213"
            toggles={{
                visVeilder: false,
                visSokefelt: true,
                visEnhetVelger: false,
                visEnhet: false,
            }}
            onSok={async fnr => {
                // TODO: Bruke aktørregister direkte her
                const aktørIdResponse = await hentAktørId(fnr);
                const pathTilPerson = hentRoute(AppRoute.SeKandidat, aktørIdResponse.data);
                props.history.push(pathTilPerson);
            }}
            onEnhetChange={enhet => {}}
            contextholder={true}
        />
    );
};

export default withRouter(Internmeny);
