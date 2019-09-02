import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppRoute, hentRoute } from '../../utils/paths';
import bemHelper from '../../utils/bemHelper';
import Brødsmulesti from '../../components/brødsmulesti/Brødsmulesti';
import FnrInput from './fnr-input/FnrInput';
import RouteBanner from '../../components/route-banner/RouteBanner';
import './førDuBegynner.less';
import useAktørId, { TilgangsStatus } from './useAktørId';

const cls = bemHelper('førDuBegynner');

const FørDuBegynner: FunctionComponent<RouteComponentProps> = ({ history }) => {
    const [fnr, setFnr] = useState<string>('');
    const [sjekkerTilgangOgEksistens, setSjekkerTilgangOgEksistens] = useState<boolean>(false);

    const { aktørId, tilgangsstatus, kandidatEksisterer } = useAktørId(
        fnr,
        sjekkerTilgangOgEksistens
    );

    const redirectTil = useCallback(
        (route: AppRoute, aktørId: string) => {
            history.push(hentRoute(route, aktørId));
        },
        [history]
    );

    useEffect(() => {
        if (tilgangsstatus !== TilgangsStatus.IngenFeil) {
            setSjekkerTilgangOgEksistens(false);
        } else if (kandidatEksisterer && aktørId) {
            redirectTil(AppRoute.EndreKandidat, aktørId);
        } else if (aktørId) {
            redirectTil(AppRoute.Registrering, aktørId);
        }
    }, [aktørId, tilgangsstatus, kandidatEksisterer, redirectTil]);

    const handleFnrChange = (fnr: string) => {
        setFnr(fnr);
        setSjekkerTilgangOgEksistens(false);
    };

    const onGåVidereKlikk = () => {
        setSjekkerTilgangOgEksistens(true);
    };

    return (
        <>
            <RouteBanner tittel="Registrer eller endre kandidat" />
            <main className={cls.block}>
                <Brødsmulesti sidenDuErPå={AppRoute.FørDuBegynner} />
                <FnrInput
                    fnr={fnr}
                    onFnrChange={handleFnrChange}
                    feilmelding={
                        tilgangsstatus === TilgangsStatus.IngenFeil ? undefined : tilgangsstatus
                    }
                />
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
