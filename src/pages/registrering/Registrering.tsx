import React, { useState, FormEvent, FunctionComponent } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { withRouter, RouteComponentProps } from 'react-router';

import { AppRoute, hentRoute, MatchProps } from '../../utils/paths';
import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    FysiskBehov,
    GrunnleggendeBehov,
    Behovfelt,
} from '../../types/Behov';
import { postKandidat } from '../../api/api';
import Arbeidsmiljø from './arbeidsmiljø/Arbeidsmiljø';
import Arbeidstid from './arbeidstid/Arbeidstid';
import bemHelper from '../../utils/bemHelper';
import Brødsmulesti from '../../components/brødsmulesti/Brødsmulesti';
import Fysisk from './fysisk/Fysisk';
import GrunnleggendeFerdigheter from './grunnleggende-ferdigheter/GrunnleggendeFerdigheter';
import Informasjon from './informasjon/Informasjon';
import Kandidat from '../../types/Kandidat';
import RouteBanner from '../../components/route-banner/RouteBanner';
import './registrering.less';
import { formaterFnr } from '../før-du-begynner/fnr-input/fnrUtils';

const cls = bemHelper('registrering');

const Registrering: FunctionComponent<RouteComponentProps<MatchProps>> = ({ history, match }) => {
    const fnr = match.params.fnr;

    const [arbeidstidBehov, setArbeidstidBehov] = useState<ArbeidstidBehov | undefined>(undefined);
    const [fysiskeBehov, setFysiskeBehov] = useState<FysiskBehov[]>([]);
    const [arbeidsmiljøBehov, setArbeidsmiljøBehov] = useState<ArbeidsmijøBehov[]>([]);
    const [grunnleggendeBehov, setGrunnleggendeBehov] = useState<GrunnleggendeBehov[]>([]);
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (arbeidstidBehov) {
            sendInnKandidatOgRedirect();
        } else {
            visFeilmeldingOmArbeidstid();
        }
    };

    const sendInnKandidatOgRedirect = async () => {
        setSubmitting(true);

        const respons = await postKandidat({
            fnr,
            fysiskeBehov,
            arbeidsmiljøBehov,
            grunnleggendeBehov,
            arbeidstidBehov: arbeidstidBehov!,
        });
        setSubmitting(false);

        if (respons) {
            history.push(hentRoute(AppRoute.SeKandidat, fnr));
        }
    };

    const visFeilmeldingOmArbeidstid = () => {
        setFeilmelding('Du må oppgi hvilken arbeidssituasjon som passer deg best.');
        const arbeidstidSection = document.getElementById(Behovfelt.ArbeidstidBehov);

        if (arbeidstidSection) {
            window.scrollTo(0, arbeidstidSection.offsetTop - 100);
        }
    };

    const handleArbeidstidBehovChange = (arbeidstidBehov: ArbeidstidBehov) => {
        setArbeidstidBehov(arbeidstidBehov);

        if (arbeidstidBehov) {
            setFeilmelding(undefined);
        }
    };

    return (
        <>
            <RouteBanner tittel="Kartlegger'n" undertittel={formaterFnr(fnr)} />

            <main className={cls.block}>
                <Brødsmulesti sidenDuErPå={AppRoute.Registrering} />
                <Informasjon />

                <form onSubmit={handleSubmit}>
                    <Arbeidstid
                        valgtAlternativ={arbeidstidBehov}
                        onChange={handleArbeidstidBehovChange}
                        feilmelding={feilmelding}
                    />
                    <Fysisk valgteAlternativer={fysiskeBehov} onChange={setFysiskeBehov} />
                    <Arbeidsmiljø
                        valgteAlternativer={arbeidsmiljøBehov}
                        onChange={setArbeidsmiljøBehov}
                    />
                    <GrunnleggendeFerdigheter
                        valgteAlternativer={grunnleggendeBehov}
                        onChange={setGrunnleggendeBehov}
                    />

                    <Hovedknapp spinner={isSubmitting} htmlType="submit">
                        Opprett kandidat
                    </Hovedknapp>
                </form>
            </main>
        </>
    );
};

export default withRouter(Registrering);
