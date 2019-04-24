import React, { useState, FormEvent } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { withRouter, RouteComponentProps } from 'react-router';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import { AppRoute } from '../../utils/paths';
import { FysiskBehov, ArbeidstidBehov } from '../../types/Behov';
import { postKandidat } from '../../api/api';
import Arbeidstid from './arbeidstid/Arbeidstid';
import bemHelper from '../../utils/bemHelper';
import Fysisk from './fysisk/Fysisk';
import Kandidat from '../../types/Kandidat';
import RouteBanner from '../../components/route-banner/RouteBanner';
import Tilbake from '../../components/tilbake/Tilbake';
import './registrering.less';

const cls = bemHelper('registrering');

const Registrering = (props: RouteComponentProps) => {
    const [fnr, setFnr] = useState<string>('');
    const [arbeidstidBehov, setArbeidstidBehov] = useState<ArbeidstidBehov>(
        ArbeidstidBehov.IkkeValgt
    );
    const [fysiskeBehov, setFysiskeBehov] = useState<FysiskBehov[]>([]);
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const kandidat: Kandidat = {
            fnr,
            arbeidstidBehov,
            fysiskeBehov,
            grunnleggendeBehov: [],
            arbeidsmiljøBehov: [],
            sistEndret: new Date(),
            sistEndretAv: 'A123456',
        };

        setSubmitting(true);
        const respons = await postKandidat(kandidat);
        setSubmitting(false);

        if (respons) {
            props.history.replace(AppRoute.OVERSIKT);
        }
    };

    return (
        <>
            <RouteBanner tittel="Ny kandidat" />

            <main className={cls.block}>
                <Tilbake til={AppRoute.OVERSIKT} />

                <form onSubmit={handleSubmit}>
                    <section className="blokk-s">
                        <Ekspanderbartpanel apen tittel="Informasjon om kandidaten">
                            <Input
                                autoFocus
                                name="fnr"
                                label="Kandidatens fødselsnummer"
                                bredde="S"
                                value={fnr}
                                onChange={event => setFnr(event.target.value)}
                            />
                        </Ekspanderbartpanel>
                    </section>

                    <section className="blokk-s">
                        <Ekspanderbartpanel apen tittel="Arbeidstid og arbeidskapasitet">
                            <Arbeidstid
                                valgtAlternativ={arbeidstidBehov}
                                onChange={setArbeidstidBehov}
                            />
                        </Ekspanderbartpanel>
                    </section>

                    <section className="blokk-s">
                        <Ekspanderbartpanel apen tittel="Fysisk tilrettelegging">
                            <Fysisk valgteAlternativer={fysiskeBehov} onChange={setFysiskeBehov} />
                        </Ekspanderbartpanel>
                    </section>

                    <Hovedknapp disabled={isSubmitting} htmlType="submit">
                        Lagre
                    </Hovedknapp>
                </form>
            </main>
        </>
    );
};

export default withRouter(Registrering);
