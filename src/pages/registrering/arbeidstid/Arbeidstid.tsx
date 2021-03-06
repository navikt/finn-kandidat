import React from 'react';
import { SkjemaGruppe, Fieldset, Radio } from 'nav-frontend-skjema';

import arbeidstidSpørsmål from './arbeidstidSpørsmål';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { ArbeidstidBehov, Behovfelt } from '../../../types/Behov';
import { Normaltekst } from 'nav-frontend-typografi';
import Tilbakemelding, { Behov } from '../tilbakemelding/Tilbakemelding';

interface Props {
    valgtAlternativ?: ArbeidstidBehov;
    onChange: (behov: ArbeidstidBehov) => void;
    feilmelding?: string;
}

const Arbeidstid = ({ valgtAlternativ, onChange, feilmelding }: Props) => (
    <section id={Behovfelt.ArbeidstidBehov} className="blokk-s">
        <Ekspanderbartpanel apen tittel={arbeidstidSpørsmål.tittel}>
            <Normaltekst className="blokk-m">
                Av og til er det ting som gjør at man ikke kan jobbe 100&nbsp;%. For eksempel at man
                har ansvar for å forsørge et familiemedlem eller at man må gå til behandling. Mange
                arbeidsgivere kan tilrettelegge for dette.
            </Normaltekst>
            <SkjemaGruppe feil={feilmelding ? { feilmelding } : undefined}>
                <Fieldset legend={arbeidstidSpørsmål.spørsmål}>
                    {arbeidstidSpørsmål.svaralternativer.map(({ behov, label }) => (
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
            </SkjemaGruppe>

            <Tilbakemelding behov={Behov.Arbeidstid} />
        </Ekspanderbartpanel>
    </section>
);

export default Arbeidstid;
