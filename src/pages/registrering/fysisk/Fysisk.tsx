import React, { FunctionComponent } from 'react';
import { FysiskBehov } from '../../../types/Behov';
import fysiskSpørsmål from './fysiskSpørsmål';
import Flervalgsalternativer from '../flervalgsalternativer/Flervalgsalternativer';
import { Fieldset } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Tilbakemelding, { Behov } from '../tilbakemelding/Tilbakemelding';
import Skeleton from 'react-loading-skeleton';

interface Props {
    valgteAlternativer?: FysiskBehov[];
    onChange: (fysiskBehov: FysiskBehov[]) => void;
}

const Fysisk: FunctionComponent<Props> = ({ valgteAlternativer, onChange }) => {
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

                <Tilbakemelding behov={Behov.Fysisk} />
            </Ekspanderbartpanel>
        </section>
    );
};

export default Fysisk;
