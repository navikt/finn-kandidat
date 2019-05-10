import React from 'react';
import { Fieldset } from 'nav-frontend-skjema';
import CheckboxMedBeskrivelse from '../../../components/checkbox-med-beskrivelse/CheckboxMedBeskrivelse';
import bemHelper from '../../../utils/bemHelper';
import './grunnleggendeFerdigheter.less';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { grunnleggendeAlternativer } from './alternativer';
import { GrunnleggendeBehov } from '../../../types/Behov';

interface Props {
    valgteAlternativer: GrunnleggendeBehov[];
    onChange: (behov: GrunnleggendeBehov[]) => void;
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
                <Fieldset legend="Har kandidaten utfordringer med noe av dette?">
                    <div className={cls.element('alternativer')}>
                        {grunnleggendeAlternativer.map(({ behov, label }) => (
                            <CheckboxMedBeskrivelse
                                className={cls.element('alternativ')}
                                key={behov}
                                label={label}
                                checked={valgteAlternativer.includes(behov)}
                                onChange={onAlternativClick(behov)}
                            />
                        ))}
                    </div>
                </Fieldset>
            </Ekspanderbartpanel>
        </section>
    );
};

export default GrunnleggendeFerdigheter;
