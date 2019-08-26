import NAVSPA from '@navikt/navspa';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AppRoute, hentRoute, MatchProps } from '../utils/paths';

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

// TODO Dekoratøren prøver å koble seg til contextholder i Modia, som lagrer hvilken bruker og enhet veileder jobber på.
// Den prøver seg på /modiacontextholder, men der ligger den ikke. Denne pathen er utenfor appens domene, så vi kan
// heller ikke legge på proxy. Må nok gjøre endringer i selve dekoratøren.

const Decorator: FunctionComponent<RouteComponentProps<MatchProps>> = props => (
    <InternflateDecorator
        appname={'“Tilrettelegger’n”'}
        fnr={props.match.params.fnr}
        enhet={null}
        toggles={{
            visVeilder: false,
            visSokefelt: true,
            visEnhetVelger: false,
            visEnhet: false,
        }}
        onSok={fnr => {
            // TODO Her må vi konvertere fra fnr til aktørId når den tid kommer.
            const pathTilPerson = hentRoute(AppRoute.SeKandidat, fnr);
            props.history.push(pathTilPerson);
        }}
        onEnhetChange={enhet => {}}
    />
);

export default withRouter(Decorator);
