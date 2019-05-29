import React, { FunctionComponent, useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppRoute, hentRoute } from '../../utils/paths';
import { erGyldigFnr, erTom } from './fnr-input/fnrUtils';
import { hentSkrivetilgang } from '../../api/api';
import bemHelper from '../../utils/bemHelper';
import Brødsmulesti from '../../components/brødsmulesti/Brødsmulesti';
import FnrInput from './fnr-input/FnrInput';
import RouteBanner from '../../components/route-banner/RouteBanner';
import './førDuBegynner.less';

const cls = bemHelper('førDuBegynner');

enum Feilmelding {
    TomtFødselsnummer = 'Vennligst fyll ut fødselsnummer',
    UgyldigFødselsnummer = 'Fødselsnummeret er ugyldig',
    IngenTilgang = 'Du har enten ikke tilgang til denne kandidaten eller så finnes ikke kandidaten i systemet',
    Serverfeil = 'Det skjedde dessverre en feil',
}

const FørDuBegynner: FunctionComponent<RouteComponentProps> = props => {
    const [fnr, setFnr] = useState<string>('00000000000'); // TODO: Fjern default fnr
    const [feilmelding, setFeilmelding] = useState<Feilmelding | undefined>(undefined);

    const handleFnrChange = (fnr: string) => {
        setFnr(fnr);
        setFeilmelding(undefined);
    };

    const onGåVidereClick = () => {
        if (erGyldigFnr(fnr)) {
            sjekkTilgangOgRedirect();
        } else if (erTom(fnr)) {
            setFeilmelding(Feilmelding.TomtFødselsnummer);
        } else {
            setFeilmelding(Feilmelding.UgyldigFødselsnummer);
        }
    };

    const sjekkTilgangOgRedirect = async () => {
        try {
            const harSkrivetilgang = await hentSkrivetilgang(fnr);
            if (harSkrivetilgang) {
                redirectTilRegistrering();
            } else {
                setFeilmelding(Feilmelding.IngenTilgang);
            }
        } catch (error) {
            setFeilmelding(Feilmelding.Serverfeil);
        }
    };

    const redirectTilRegistrering = () => {
        props.history.push(hentRoute(AppRoute.Registrering, fnr));
    };

    return (
        <>
            <RouteBanner tittel="Registrer eller endre kandidat" />
            <main className={cls.block}>
                <Brødsmulesti sidenDuErPå={AppRoute.FørDuBegynner} />
                <FnrInput fnr={fnr} onFnrChange={handleFnrChange} feilmelding={feilmelding} />
                <Hovedknapp className={cls.element('knapp')} onClick={onGåVidereClick}>
                    Gå videre
                </Hovedknapp>
            </main>
        </>
    );
};

export default withRouter(FørDuBegynner);
