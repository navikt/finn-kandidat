import React from 'react';
import { Fieldset, Radio } from 'nav-frontend-skjema';

import { ArbeidstidBehov } from '../../../types/Behov';
import alternativer from './alternativer';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
    valgtAlternativ?: ArbeidstidBehov;
    onChange: (value: ArbeidstidBehov) => void;
}

const Arbeidstid = ({ valgtAlternativ, onChange }: Props) => (
    <section className="blokk-s">
        <Ekspanderbartpanel apen tittel="Arbeidstid og arbeidskapasitet">
            <p className="blokk-m">
                Av og til er det ting som gjør at man ikke kan jobbe 100&nbsp;%. For eksempel at man
                har ansvar for å forsørge et familiemedlem eller at man må gå til behandling. Mange
                arbeidsgivere kan tilrettelegge for dette.
            </p>
            <Fieldset legend="Hvilken arbeidssituasjon passer deg best?">
                {alternativer.map(({ value, label }) => (
                    <Radio
                        name="arbeidssituasjon"
                        key={value}
                        label={label}
                        value={value}
                        checked={valgtAlternativ === value}
                        onChange={() => onChange(value)}
                    />
                ))}
            </Fieldset>
        </Ekspanderbartpanel>
    </section>
);

export default Arbeidstid;
