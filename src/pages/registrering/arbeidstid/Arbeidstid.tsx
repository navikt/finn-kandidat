import React from 'react';
import { Fieldset, Radio } from 'nav-frontend-skjema';

import { arbeidstidAlternativer } from './alternativer';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { ArbeidstidBehov } from '../../../types/Behov';

interface Props {
    valgtAlternativ?: ArbeidstidBehov;
    onChange: (behov: ArbeidstidBehov) => void;
}

const Arbeidstid = ({ valgtAlternativ, onChange }: Props) => (
    <section className="blokk-s">
        <Ekspanderbartpanel apen tittel="Arbeidstid og arbeidskapasitet">
            <p className="blokk-m">
                Av og til er det ting som gjør at man ikke kan jobbe 100&nbsp;%. For eksempel at man
                har ansvar for å forsørge et familiemedlem eller at man må gå til behandling. Mange
                arbeidsgivere kan tilrettelegge for dette.
            </p>
            <Fieldset legend="Hvilken arbeidssituasjon passer kandidaten best akkurat nå?">
                {arbeidstidAlternativer.map(({ behov, label }) => (
                    <Radio
                        name="arbeidssituasjon"
                        key={behov}
                        label={label}
                        value={behov}
                        checked={valgtAlternativ === behov}
                        onChange={() => onChange(behov)}
                    />
                ))}
            </Fieldset>
        </Ekspanderbartpanel>
    </section>
);

export default Arbeidstid;
