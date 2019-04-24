import React from 'react';
import { Fieldset } from 'nav-frontend-skjema';
import CheckboxMedBeskrivelse from '../../../components/checkbox-med-beskrivelse/CheckboxMedBeskrivelse';
import alternativer from './alternativer';
import { FysiskBehov } from '../../../types/Behov';

interface Props {
    valgteAlternativer: FysiskBehov[];
    onChange: (value: FysiskBehov[]) => void;
}

const Fysisk = ({ valgteAlternativer, onChange }: Props) => {
    const fjernAlternativ = (alternativ: FysiskBehov) =>
        onChange(valgteAlternativer.filter(valgt => valgt !== alternativ));

    const leggTilAlternativ = (alternativ: FysiskBehov) =>
        onChange([...valgteAlternativer, alternativ]);

    const onAlternativClick = (alternativ: FysiskBehov) => () =>
        valgteAlternativer.includes(alternativ)
            ? fjernAlternativ(alternativ)
            : leggTilAlternativ(alternativ);

    return (
        <Fieldset legend="Dersom du har behov for fysisk tilrettelegging, hva bør det legges til rette for?">
            {alternativer.map(({ value, label, beskrivelse }) => (
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

export default Fysisk;
