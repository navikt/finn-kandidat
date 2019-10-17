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

    const onGåVidereKlikk = async () => {
        if (process.env.REACT_APP_MOCK) {
            redirectTil(AppRoute.Registrering, '9293040980561');
            return;
        }

        setSjekkerTilgangOgEksistens(true);

        try {
            const aktørId = await sjekkTilgangOgEksistens();
            hentKandidat(aktørId)
                .then(kandidat => redirectTil(AppRoute.EndreKandidat, kandidat.aktørId))
                .catch(() => redirectTil(AppRoute.Registrering, aktørId));
        } catch (error) {
            setFeilmelding(error);
            setSjekkerTilgangOgEksistens(false);
        }
    };

    // TODO: Rydd opp i denne funksjonen ved å legge inn RestKandidat
    const sjekkTilgangOgEksistens = async (): Promise<string> => {
        if (erTom(fnr)) {
            return Promise.reject(Feilmelding.TomtFødselsnummer);
        }

        if (!erGyldigFnr(fnr)) {
            return Promise.reject(Feilmelding.UgyldigFødselsnummer);
        }

        try {
            const aktørId = await hentAktørId(fnr);
            const skrivetilgang = await hentSkrivetilgang(aktørId);

            return skrivetilgang
                ? Promise.resolve(aktørId)
                : Promise.reject(Feilmelding.IngenTilgang);
        } catch (error) {
            return Promise.reject(
                error.status === 400 ? Feilmelding.UgyldigFødselsnummer : Feilmelding.Serverfeil
            );
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
