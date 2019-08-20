import React, { FunctionComponent } from 'react';
import { FysiskBehov } from '../../../types/Behov';
import fysiskSpørsmål from './fysiskSpørsmål';
import Flervalgsalternativer from '../flervalgsalternativer/Flervalgsalternativer';
import { Fieldset } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Tilbakemelding from '../tilbakemelding/Tilbakemelding';
import Skeleton from 'react-loading-skeleton';

interface Props {
    valgteAlternativer?: FysiskBehov[];
    onChange: (fysiskBehov: FysiskBehov[]) => void;
    iRegistreringsModus?: boolean;
}

const Fysisk: FunctionComponent<Props> = ({
    valgteAlternativer,
    onChange,
    iRegistreringsModus,
}) => {
    const skalViseTilbakemeldingsInput =
        iRegistreringsModus &&
        valgteAlternativer &&
        valgteAlternativer.includes(FysiskBehov.AndreFormer);

    return (
        <section className="blokk-s">
            <Ekspanderbartpanel apen tittel={fysiskSpørsmål.tittel}>
                <Fieldset legend={fysiskSpørsmål.spørsmål}>
                    {valgteAlternativer ? (
                        <Flervalgsalternativer
                            spørsmål={fysiskSpørsmål}
                            valgteAlternativer={valgteAlternativer}
                            onChange={onChange}
                        />
                    ) : (
                        <Skeleton />
                    )}
                </Fieldset>
                {skalViseTilbakemeldingsInput && <Tilbakemelding behov="FYSISK" />}
            </Ekspanderbartpanel>
        </section>
    );
};

export default Fysisk;
