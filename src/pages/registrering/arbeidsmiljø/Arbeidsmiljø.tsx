import React from 'react';
import { Fieldset } from 'nav-frontend-skjema';
import CheckboxMedBeskrivelse from '../../../components/checkbox-med-beskrivelse/CheckboxMedBeskrivelse';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { arbeidsmiløAlternativer } from './alternativer';
import { ArbeidsmijøBehov } from '../../../types/Behov';

interface Props {
    valgteAlternativer: ArbeidsmijøBehov[];
    onChange: (behov: ArbeidsmijøBehov[]) => void;
}

const Arbeidsmiljø = ({ valgteAlternativer, onChange }: Props) => {
    const fjernAlternativ = (alternativ: ArbeidsmijøBehov) =>
        onChange(valgteAlternativer.filter(valgt => valgt !== alternativ));

    const leggTilAlternativ = (alternativ: ArbeidsmijøBehov) =>
        onChange([...valgteAlternativer, alternativ]);

    const onAlternativClick = (alternativ: ArbeidsmijøBehov) => () =>
        valgteAlternativer.includes(alternativ)
            ? fjernAlternativ(alternativ)
            : leggTilAlternativ(alternativ);

    return (
        <section className="blokk-s">
            <Ekspanderbartpanel apen tittel="Arbeidsmiljø">
                <Fieldset legend="Dersom det er behov for tilrettelegging av arbeidsmiljøet, hvordan bør det tilrettelegges for kandidaten?">
                    {arbeidsmiløAlternativer.map(({ behov, label, beskrivelse }) => (
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

export default Arbeidsmiljø;
