import React, { useState, FormEvent } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { withRouter, RouteComponentProps } from 'react-router';

import { AppRoute } from '../../utils/paths';
import { postKandidat } from '../../api/api';
import Arbeidssituasjon from './arbeidssituasjon/Arbeidssituasjon';
import bemHelper from '../../utils/bemHelper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Fysisk from '../../types/FysiskTilrettelegging';
import FysiskTilrettelegging from './fysisk-tilrettelegging/FysiskTilrettelegging';
import RouteBanner from '../../components/route-banner/RouteBanner';
import Situasjon from '../../types/Arbeidssituasjon';
import Tilbake from '../../components/tilbake/Tilbake';
import './registrering.less';

const cls = bemHelper('registrering');

const Registrering = (props: RouteComponentProps) => {
    const [fnr, setFnr] = useState<string>('');
    const [arbeidssituasjon, setArbeidssituasjon] = useState<Situasjon>(Situasjon.IKKE_VALGT);
    const [fysiskTilrettelegging, setFysiskTilrettelegging] = useState<Fysisk[]>([]);
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const kandidat = {
            fnr,
            arbeidssituasjon,
            fysiskTilrettelegging,
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
                            <Arbeidssituasjon
                                valgtAlternativ={arbeidssituasjon}
                                onChange={setArbeidssituasjon}
                            />
                        </Ekspanderbartpanel>
                    </section>

                    <section className="blokk-s">
                        <Ekspanderbartpanel apen tittel="Fysisk tilrettelegging">
                            <FysiskTilrettelegging
                                valgteAlternativer={fysiskTilrettelegging}
                                onChange={setFysiskTilrettelegging}
                            />
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
