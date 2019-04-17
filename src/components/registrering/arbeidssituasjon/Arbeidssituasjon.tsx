import React from 'react';
import { Fieldset, Radio } from 'nav-frontend-skjema';
import arbeidssituasjonRadios from './arbeidssituasjonRadios';
import Situasjon from '../../../types/Arbeidssituasjon';

interface Props {
    valgtAlternativ?: Situasjon;
    onChange: (value: Situasjon) => void;
}

const Arbeidssituasjon = ({ valgtAlternativ, onChange }: Props) => (
    <>
        <p className="blokk-m">
            Av og til er det ting som gjør at man ikke kan jobbe 100%. For eksempel at man har
            ansvar for å forsørge et familiemedlem eller at man må gå til behandling. Mange
            arbeidsgivere kan tilrettelegge for dette.
        </p>
        <Fieldset legend="Hvilken arbeidssituasjon passer deg best?">
            {arbeidssituasjonRadios.map(({ value, label }) => (
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
    </>
);

export default Arbeidssituasjon;
