import React, { FunctionComponent, useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppRoute, hentRoute } from '../../utils/paths';
import { erGyldigFnr, erTom } from './fnr-input/fnrUtils';
import { hentSkrivetilgang, hentAktørId, hentKandidat } from '../../api/finnKandidatApi';
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
    const [fnr, setFnr] = useState<string>('');

    const [feilmelding, setFeilmelding] = useState<Feilmelding | undefined>(undefined);
    const [sjekkerTilgangOgEksistens, setSjekkerTilgangOgEksistens] = useState<boolean>();

    const handleFnrChange = (fnr: string) => {
        setFnr(fnr);
        setFeilmelding(undefined);
    };

    // TODO: Rydd opp i denne funksjonen ved å legge inn RestKandidat
    const onGåVidereKlikk = async () => {
        // Kun i Mock
        if (process.env.REACT_APP_MOCK) {
            redirectTil(AppRoute.Registrering, '1856024171652');
            return;
        }

        // Valider fnr
        if (erTom(fnr)) {
            setFeilmelding(Feilmelding.TomtFødselsnummer);
            return;
        }
        if (!erGyldigFnr(fnr)) {
            setFeilmelding(Feilmelding.UgyldigFødselsnummer);
            return;
        }

        // Hent aktørId
        let aktørId: string = '';
        try {
            const response = await hentAktørId(fnr);
            aktørId = response.data;
        } catch (error) {
            if (error.response.status === 400) {
                setFeilmelding(Feilmelding.UgyldigFødselsnummer);
                return;
            } else if (error.response.status === 500) {
                setFeilmelding(Feilmelding.Serverfeil);
                return;
            }
        } finally {
            setSjekkerTilgangOgEksistens(true);
        }

        // Hent skrivetilgang
        const harSkrivetilgang = await hentSkrivetilgang(aktørId);
        if (!harSkrivetilgang) {
            setFeilmelding(Feilmelding.IngenTilgang);
            return;
        }

        // Kandidat fins fra før eller ikke?
        setSjekkerTilgangOgEksistens(false);
        try {
            const kandidat = await hentKandidat(aktørId);
            redirectTil(AppRoute.EndreKandidat, kandidat.aktørId);
        } catch (error) {
            // Kandidat eksisterer ikke
            redirectTil(AppRoute.Registrering, aktørId);
        }
    };

    const redirectTil = (route: AppRoute, aktørId: string) => {
        props.history.push(hentRoute(route, aktørId));
    };

    return (
        <>
            <RouteBanner tittel="Registrer eller endre kandidat" />
            <main className={cls.block}>
                <Brødsmulesti sidenDuErPå={AppRoute.FørDuBegynner} />
                <FnrInput fnr={fnr} onFnrChange={handleFnrChange} feilmelding={feilmelding} />
                <Hovedknapp
                    spinner={sjekkerTilgangOgEksistens}
                    className={cls.element('knapp')}
                    onClick={onGåVidereKlikk}
                >
                    Gå videre
                </Hovedknapp>
            </main>
        </>
    );
};

export default withRouter(FørDuBegynner);
