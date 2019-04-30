import React, { FunctionComponent } from 'react';
import { Input } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
    fnr: string;
    setFnr: (fnr: string) => void;
}

const OmKandidaten: FunctionComponent<Props> = ({ fnr, setFnr }) => {
    return (
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
    );
};

export default OmKandidaten;
