import React, { FunctionComponent, useState } from 'react';
import './førDuBegynner.less';
import bemHelper from '../../utils/bemHelper';
import RouteBanner from '../../components/route-banner/RouteBanner';
import Tilbake from '../../components/tilbake/Tilbake';
import { AppRoute } from '../../utils/paths';
import InfoBoks from './infoboks/InfoBoks';
import FnrInput from './fnr-input/FnrInput';
import { Hovedknapp } from 'nav-frontend-knapper';
import { RouteComponentProps, withRouter } from 'react-router';
import { hentSkrivetilgang } from '../../api/api';
import { erGyldigFnr, erTom } from './fnr-input/fnrUtils';

const cls = bemHelper('førDuBegynner');

const FørDuBegynner: FunctionComponent<RouteComponentProps> = props => {
    const [fnr, setFnr] = useState<string>('');
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
            props.history.push(`${AppRoute.Registrering}/${fnr}`);
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
                <Tilbake til={AppRoute.Oversikt} />
                <InfoBoks />
                <FnrInput
                    fnr={fnr}
                    setFnr={oppdaterFnrOgFjernFeilmelding}
                    feilmelding={feilmelding}
                />
                <Hovedknapp onClick={onGåVidereKlikk}>Gå videre</Hovedknapp>
            </main>
        </>
    );
};

export default withRouter(FørDuBegynner);
