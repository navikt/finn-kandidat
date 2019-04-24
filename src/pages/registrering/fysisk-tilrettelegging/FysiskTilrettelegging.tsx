import React from 'react';
import { Fieldset } from 'nav-frontend-skjema';
import Alternativ from '../../../types/FysiskTilrettelegging';
import CheckboxMedBeskrivelse from '../../../components/checkbox-med-beskrivelse/CheckboxMedBeskrivelse';
import fysiskTilretteleggingAlternativer from './fysiskTilretteleggingAlternativer';

interface Props {
    valgteAlternativer: Alternativ[];
    onChange: (value: Alternativ[]) => void;
}

const FysiskTilrettelegging = ({ valgteAlternativer, onChange }: Props) => {
    const fjernAlternativ = (alternativ: Alternativ) =>
        onChange(valgteAlternativer.filter(valgt => valgt !== alternativ));

    const leggTilAlternativ = (alternativ: Alternativ) =>
        onChange([...valgteAlternativer, alternativ]);

    const onAlternativClick = (alternativ: Alternativ) => () =>
        valgteAlternativer.includes(alternativ)
            ? fjernAlternativ(alternativ)
            : leggTilAlternativ(alternativ);

    return (
        <Fieldset legend="Dersom du har behov for fysisk tilrettelegging, hva bør det legges til rette for?">
            {fysiskTilretteleggingAlternativer.map(({ value, label, beskrivelse }) => (
                <CheckboxMedBeskrivelse
                    key={value}
                    label={label}
                    beskrivelse={beskrivelse}
                    checked={valgteAlternativer.includes(value)}
                    onChange={onAlternativClick(value)}
                />
            ))}
        </Fieldset>
    );
};

export default FysiskTilrettelegging;
