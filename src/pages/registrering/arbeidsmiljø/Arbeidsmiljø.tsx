import React, { FunctionComponent } from 'react';
import { ArbeidsmijøBehov } from '../../../types/Behov';
import arbeidsmiljøSpørsmål from './arbeidsmiljøSpørsmål';
import Flervalgsalternativer from '../flervalgsalternativer/Flervalgsalternativer';
import { Fieldset } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Tilbakemelding from '../tilbakemelding/Tilbakemelding';

interface Props {
    valgteAlternativer: ArbeidsmijøBehov[];
    onChange: (arbeidsmiljøBehov: ArbeidsmijøBehov[]) => void;
    iRegistreringsModus?: boolean;
}

const Arbeidsmiljø: FunctionComponent<Props> = ({
    valgteAlternativer,
    onChange,
    iRegistreringsModus,
}) => {
    const skalViseTilbakemeldingsInput =
        iRegistreringsModus && valgteAlternativer.includes(ArbeidsmijøBehov.Annet);

    return (
        <section className="blokk-s">
            <Ekspanderbartpanel apen tittel={arbeidsmiljøSpørsmål.tittel}>
                <Fieldset legend={arbeidsmiljøSpørsmål.spørsmål}>
                    <Flervalgsalternativer
                        spørsmål={arbeidsmiljøSpørsmål}
                        valgteAlternativer={valgteAlternativer}
                        onChange={onChange}
                    />
                </Fieldset>
                {skalViseTilbakemeldingsInput && <Tilbakemelding behov="ARBEIDSMILJØ" />}
            </Ekspanderbartpanel>
        </section>
    );
};

export default Arbeidsmiljø;
