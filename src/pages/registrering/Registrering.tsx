import React, { useState, FormEvent, FunctionComponent, useEffect } from 'react';
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
import { hentFnr, opprettKandidat } from '../../api/finnKandidatApi';
import Arbeidsmiljø from './arbeidsmiljø/Arbeidsmiljø';
import Arbeidstid from './arbeidstid/Arbeidstid';
import bemHelper from '../../utils/bemHelper';
import Brødsmulesti from '../../components/brødsmulesti/Brødsmulesti';
import Fysisk from './fysisk/Fysisk';
import GrunnleggendeFerdigheter from './grunnleggende-ferdigheter/GrunnleggendeFerdigheter';
import Informasjon from './informasjon/Informasjon';
import { Kandidat } from '../../types/Kandidat';
import RouteBanner from '../../components/route-banner/RouteBanner';
import './registrering.less';

const cls = bemHelper('registrering');

const Registrering: FunctionComponent<RouteComponentProps<MatchProps>> = ({ history, match }) => {
    const aktørId = match.params.aktorId;

    const [arbeidstidBehov, setArbeidstidBehov] = useState<ArbeidstidBehov | undefined>(undefined);
    const [fysiskeBehov, setFysiskeBehov] = useState<FysiskBehov[]>([]);
    const [arbeidsmiljøBehov, setArbeidsmiljøBehov] = useState<ArbeidsmijøBehov[]>([]);
    const [grunnleggendeBehov, setGrunnleggendeBehov] = useState<GrunnleggendeBehov[]>([]);
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);
    const [fnr, setFnr] = useState<string>('');

    useEffect(() => {
        const hentOgSettFnr = async () => {
            const respons = await hentFnr(aktørId);
            setFnr(respons.data);
        };
        hentOgSettFnr();
    }, [aktørId]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (arbeidstidBehov) {
            sendInnKandidatOgRedirect(arbeidstidBehov);
        } else {
            visFeilmeldingOmArbeidstid();
        }
    };

    const sendInnKandidatOgRedirect = async (arbeidstidBehov: ArbeidstidBehov) => {
        setSubmitting(true);

        const kandidat: Kandidat = {
            aktørId,
            fnr,
            fysiskeBehov,
            arbeidsmiljøBehov,
            grunnleggendeBehov,
            arbeidstidBehov: [arbeidstidBehov],
            navKontor: null,
        };

        const respons = await opprettKandidat(kandidat);
        setSubmitting(false);

        if (respons) {
            history.push(hentRoute(AppRoute.SeKandidat, aktørId));
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
            <RouteBanner tittel="Ny kandidat" undertittel={fnr} />

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
