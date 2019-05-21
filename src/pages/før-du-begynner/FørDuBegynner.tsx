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

const FørDuBegynner: FunctionComponent<RouteComponentProps> = props => {
    const [fnr, setFnr] = useState<string>('00000000000'); // TODO: Fjern default fnr
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);

    const onGåVidereKlikk = async () => {
        if (erGyldigFnr(fnr)) {
            await redirectTilRegistreringHvisTilgang();
        } else {
            settFeilmelding(fnr);
        }
    };

    const redirectTilRegistreringHvisTilgang = async () => {
        const harSkrivetilgang = await hentSkrivetilgang(fnr);

        if (harSkrivetilgang) {
            props.history.push(hentRoute(AppRoute.Registrering, fnr));
        } else {
            setFeilmelding(
                'Du har enten ikke tilgang til denne kandidaten eller så finnes ikke kandidaten i systemet'
            );
        }
    };

    const settFeilmelding = (fnr: string) => {
        if (erTom(fnr)) {
            setFeilmelding('Vennligst fyll ut fødselsnummer');
        } else if (!erGyldigFnr(fnr)) {
            setFeilmelding('Fødselsnummeret er ugyldig');
        }
    };

    const oppdaterFnrOgFjernFeilmelding = (fnr: string) => {
        setFnr(fnr);
        setFeilmelding(undefined);
    };

    return (
        <>
            <RouteBanner tittel="Tilretteleggingsbehov" />
            <main className={cls.block}>
                <Brødsmulesti sidenDuErPå={AppRoute.FørDuBegynner} />
                <FnrInput
                    fnr={fnr}
                    setFnr={oppdaterFnrOgFjernFeilmelding}
                    feilmelding={feilmelding}
                />
                <Hovedknapp className={cls.element('knapp')} onClick={onGåVidereKlikk}>
                    Gå videre
                </Hovedknapp>
            </main>
        </>
    );
};

export default withRouter(FørDuBegynner);
