import React, { useState, FormEvent } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { withRouter, RouteComponentProps } from 'react-router';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import { AppRoute } from '../../utils/paths';
import {
    FysiskBehov,
    ArbeidstidBehov,
    ArbeidsmijøBehov,
    GrunnleggendeBehov,
} from '../../types/Behov';
import { postKandidat } from '../../api/api';
import Arbeidstid from './arbeidstid/Arbeidstid';
import bemHelper from '../../utils/bemHelper';
import Fysisk from './fysisk/Fysisk';
import Kandidat from '../../types/Kandidat';
import RouteBanner from '../../components/route-banner/RouteBanner';
import Tilbake from '../../components/tilbake/Tilbake';
import './registrering.less';
import Arbeidsmiljø from './arbeidsmiljø/Arbeidsmiljø';
import GrunnleggendeFerdigheter from './grunnleggende-ferdigheter/GrunnleggendeFerdigheter';
import OmKandidaten from './om-kandidaten/OmKandidaten';

const cls = bemHelper('registrering');

const Registrering = (props: RouteComponentProps) => {
    const [fnr, setFnr] = useState<string>('');
    const [arbeidstidBehov, setArbeidstidBehov] = useState<ArbeidstidBehov | undefined>(undefined);
    const [fysiskeBehov, setFysiskeBehov] = useState<FysiskBehov[]>([]);
    const [arbeidsmiljøBehov, setArbeidsmiljøBehov] = useState<ArbeidsmijøBehov[]>([]);
    const [grunnleggendeBehov, setGrunnleggendeBehov] = useState<GrunnleggendeBehov[]>([]);
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const kandidat: Kandidat = {
            fnr,
            arbeidstidBehov,
            fysiskeBehov,
            arbeidsmiljøBehov,
            grunnleggendeBehov,
            sistEndret: new Date(),
            sistEndretAv: 'A123456',
        };

        setSubmitting(true);
        const respons = await postKandidat(kandidat);
        setSubmitting(false);

        if (respons) {
            props.history.push(AppRoute.Oversikt);
        }
    };

    return (
        <>
            <RouteBanner tittel="Ny kandidat" />

            <main className={cls.block}>
                <Tilbake til={AppRoute.Oversikt} />

                <form onSubmit={handleSubmit}>
                    <OmKandidaten fnr={fnr} setFnr={setFnr} />
                    <Arbeidstid valgtAlternativ={arbeidstidBehov} onChange={setArbeidstidBehov} />
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
