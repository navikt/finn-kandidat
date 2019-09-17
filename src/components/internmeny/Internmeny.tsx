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
    console.log(aktørId);
    console.log(fnr);

    useEffect(() => {
        if (!aktørId) {
            setFnr('');
            return;
        }

        const hentOgSettFnr = async () => {
            // TODO: Bruke aktørregister direkte her
            try {
                const respons = await hentFnr(aktørId);
                setFnr(respons.data);
                console.log('setter fnr', respons.data);
            } catch (error) {
                setFnr('');
            }
        };
        hentOgSettFnr();
    }, [aktørId]);

    // TODO: Hva skal enheten settes til?
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
