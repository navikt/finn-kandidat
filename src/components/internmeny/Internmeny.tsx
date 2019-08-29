import NAVSPA from '@navikt/navspa';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AppRoute, hentRoute, MatchProps } from '../../utils/paths';
import { hentAktørId, hentFnr } from '../../api/finnKandidatApi';
import { DecoratorProps } from './internmenyTypes';

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

const Internmeny: FunctionComponent<RouteComponentProps<MatchProps>> = props => {
    const [fnr, setFnr] = useState<string>('');

    const aktørId = props.match.params.aktorId;

    useEffect(() => {
        const hentOgSettFnr = async () => {
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
            enhet={"0213"}
            toggles={{
                visVeilder: false,
                visSokefelt: true,
                visEnhetVelger: false,
                visEnhet: false,
            }}
            onSok={async fnr => {
                const aktørIdResponse = await hentAktørId(fnr);
                const pathTilPerson = hentRoute(AppRoute.SeKandidat, aktørIdResponse.data);
                props.history.push(pathTilPerson);
            }}
            onEnhetChange={enhet => {}}
        />
    );
};

export default withRouter(Internmeny);
