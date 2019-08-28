import NAVSPA from '@navikt/navspa';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AppRoute, hentRoute, MatchProps } from '../utils/paths';
import { hentAktørId, hentFnr } from '../api/finnKandidatApi';

interface DecoratorProps {
    appname: string; 
    fnr: string | undefined | null; 
    enhet: string | undefined | null; 
    toggles: Toggles; 
    markup?: Markup; 

    onSok(fnr: string): void; 

    onEnhetChange(enhet: string): void; 
    contextholder?: true | Contextholder; 
}

interface Toggles {
    visVeilder: boolean;
    visSokefelt: boolean;
    visEnhetVelger: boolean;
    visEnhet: boolean;
}

interface Contextholder {
    url?: string;
    promptBeforeEnhetChange?: boolean; 
}

interface Markup {
    etterSokefelt?: string;
}

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
            enhet={null}
            toggles={{
                visVeilder: false,
                visSokefelt: true,
                visEnhetVelger: false,
                visEnhet: false,
            }}
            onSok={async (fnr) => {
                const aktørIdResponse = await hentAktørId(fnr);
                const pathTilPerson = hentRoute(AppRoute.SeKandidat, aktørIdResponse.data);
                props.history.push(pathTilPerson);
            }}
            onEnhetChange={enhet => {
            }}
        />
    );
}

export default withRouter(Internmeny);
