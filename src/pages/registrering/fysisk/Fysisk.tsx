import React from 'react';
import { Fieldset } from 'nav-frontend-skjema';
import CheckboxMedBeskrivelse from '../../../components/checkbox-med-beskrivelse/CheckboxMedBeskrivelse';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { fysiskeAlternativer } from './alternativer';
import { FysiskBehov } from '../../../types/Behov';

interface Props {
    valgteAlternativer: FysiskBehov[];
    onChange: (behov: FysiskBehov[]) => void;
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
        <section className="blokk-s">
            <Ekspanderbartpanel apen tittel="Fysisk tilrettelegging">
                <Fieldset legend="Dersom kandidaten har behov for fysisk tilrettelegging, hva bør det tilrettelegges for?">
                    {fysiskeAlternativer.map(({ behov, label, beskrivelse }) => (
                        <CheckboxMedBeskrivelse
                            key={behov}
                            label={label}
                            beskrivelse={beskrivelse}
                            checked={valgteAlternativer.includes(behov)}
                            onChange={onAlternativClick(behov)}
                        />
                    ))}
                </Fieldset>
            </Ekspanderbartpanel>
        </section>
    );
};

export default Fysisk;
