import React, { FunctionComponent } from 'react';
import { ArbeidsmijøBehov } from '../../../types/Behov';
import arbeidsmiljøSpørsmål from './arbeidsmiljøSpørsmål';
import Flervalgsalternativer from '../flervalgsalternativer/Flervalgsalternativer';
import { Fieldset } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Tilbakemelding, { Behov } from '../tilbakemelding/Tilbakemelding';
import Skeleton from 'react-loading-skeleton';

interface Props {
    valgteAlternativer?: ArbeidsmijøBehov[];
    onChange: (arbeidsmiljøBehov: ArbeidsmijøBehov[]) => void;
}

const Arbeidsmiljø: FunctionComponent<Props> = ({ valgteAlternativer, onChange }) => {
    return (
        <section className="blokk-s">
            <Ekspanderbartpanel apen tittel={arbeidsmiljøSpørsmål.tittel}>
                <Fieldset legend={arbeidsmiljøSpørsmål.spørsmål}>
                    {valgteAlternativer ? (
                        <Flervalgsalternativer
                            spørsmål={arbeidsmiljøSpørsmål}
                            valgteAlternativer={valgteAlternativer}
                            onChange={onChange}
                        />
                    ) : (
                        <Skeleton />
                    )}
                </Fieldset>

                <Tilbakemelding behov={Behov.Arbeidsmiljø} />
            </Ekspanderbartpanel>
        </section>
    );
};

export default Arbeidsmiljø;
