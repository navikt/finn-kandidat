import React from 'react';
import { Fieldset } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import Spørsmål from '../Spørsmål';
import Flervalgsalternativer from './Flervalgsalternativer';
import { Behov } from '../../../types/Behov';

interface Props<T extends Behov> {
    spørsmål: Spørsmål<T>;
    valgteAlternativer: T[];
    onChange: (behov: T[]) => void;
}

class Flervalgsspørsmål<T extends Behov> extends React.Component<Props<T>> {
    render = () => {
        const { spørsmål, valgteAlternativer, onChange } = this.props;

        return (
            <section className="blokk-s">
                <Ekspanderbartpanel apen tittel={spørsmål.tittel}>
                    <Fieldset legend={spørsmål.spørsmål}>
                        <Flervalgsalternativer
                            spørsmål={spørsmål}
                            valgteAlternativer={valgteAlternativer}
                            onChange={onChange}
                        />
                    </Fieldset>
                </Ekspanderbartpanel>
            </section>
        );
    };
}

export default Flervalgsspørsmål;
