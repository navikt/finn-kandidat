import React from 'react';
import { Fieldset } from 'nav-frontend-skjema';
import CheckboxMedBeskrivelse from '../../../components/checkbox-med-beskrivelse/CheckboxMedBeskrivelse';
import alternativer from './alternativer';
import { GrunnleggendeBehov } from '../../../types/Behov';
import bemHelper from '../../../utils/bemHelper';
import './grunnleggendeFerdigheter.less';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
    valgteAlternativer: GrunnleggendeBehov[];
    onChange: (value: GrunnleggendeBehov[]) => void;
}

const cls = bemHelper('grunnleggendeFerdigheter');

const GrunnleggendeFerdigheter = ({ valgteAlternativer, onChange }: Props) => {
    const fjernAlternativ = (alternativ: GrunnleggendeBehov) =>
        onChange(valgteAlternativer.filter(valgt => valgt !== alternativ));

    const leggTilAlternativ = (alternativ: GrunnleggendeBehov) =>
        onChange([...valgteAlternativer, alternativ]);

    const onAlternativClick = (alternativ: GrunnleggendeBehov) => () =>
        valgteAlternativer.includes(alternativ)
            ? fjernAlternativ(alternativ)
            : leggTilAlternativ(alternativ);

    return (
        <section className="blokk-s">
            <Ekspanderbartpanel apen tittel="Grunnleggende ferdigheter">
                <p className="blokk-m">
                    Mange arbeidsgivere kan tilrettelegge for arbeidstakere som har utfordringer med
                    ferdigheter som for eksempel å snakke norsk.
                </p>
                <Fieldset
                    className={cls.element('alternativer')}
                    legend="Har du utfordringer med noe av dette?"
                >
                    {alternativer.map(({ value, label }) => (
                        <CheckboxMedBeskrivelse
                            key={value}
                            label={label}
                            checked={valgteAlternativer.includes(value)}
                            onChange={onAlternativClick(value)}
                        />
                    ))}
                </Fieldset>
            </Ekspanderbartpanel>
        </section>
    );
};

export default GrunnleggendeFerdigheter;
