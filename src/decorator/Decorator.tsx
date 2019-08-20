import NAVSPA from '@navikt/navspa';
import React, { FunctionComponent } from 'react';

interface DecoratorProps {
    appname: string; // Navn på applikasjon
    fnr: string | undefined | null; // Fødselsnummer på bruker i context. NB, endring av denne medfører oppdatering av context
    enhet: string | undefined | null; // Enhetsnummer på enhet i context. NB, endring av denne medfører oppdatering av context
    toggles: Toggles; // Konfigurasjon av hvile elementer som skal vises i dekoratøren
    markup?: Markup; // Ekstra innhold i dekoratøren, kan brukes om man trenger å legge en knapp innenfor dekoratøren

    onSok(fnr: string): void; // Callback-funksjon for når man skal bytte bruker (blir kalt etter bekreftelse-modal, eller ved direkte søk i søkefeltet)

    onEnhetChange(enhet: string): void; // Callback-funksjon for når man skal bytte enhet (blir kalt etter beksreftelse-modal, eller ved direkte endring i enhets-dropdown)
    contextholder?: true | Contextholder; // Konfigurasjn av tilkobling til contextholder. true; use default. Om man sender inn objekt så kan man overstyre url og om enhet skal generere bekreftelsemodal. Om den ikke settes vil man ikke bruke contextholder.
}

interface Toggles {
    visVeilder: boolean;
    visSokefelt: boolean;
    visEnhetVelger: boolean;
    visEnhet: boolean;
}

interface Contextholder {
    url?: string;
    promptBeforeEnhetChange?: boolean; // Kan settes om man ikke ønsker bekreftelse-modal ved enhets-endringer
}

interface Markup {
    etterSokefelt?: string;
}

export interface Saksbehandler {
    ident: string;
    fornavn: string;
    etternavn: string;
    navn: string;
    enheter: Array<Enhet>;
}

interface Enhet {
    enhetId: string;
    navn: string;
}

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

const decoratorProps: DecoratorProps = {
    appname: 'finn-kandidat',
    fnr: null,
    enhet: null,
    toggles: {
        visVeilder: true,
        visSokefelt: true,
        visEnhetVelger: true,
        visEnhet: true,
    },
    onSok: fnr => {},
    onEnhetChange: enhet => {},
};

export const Decorator: FunctionComponent = () => <InternflateDecorator {...decoratorProps} />;
