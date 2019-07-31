import React from 'react';
import { Fieldset } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import { GrunnleggendeBehov } from '../../../types/Behov';
import bemHelper from '../../../utils/bemHelper';
import Flervalgsalternativer from '../flervalgsalternativer/Flervalgsalternativer';
import grunnleggendeFerdigheterSpørsmål from './grunnleggendeFerdigheterSpørsmål';
import './grunnleggendeFerdigheter.less';
import Tilbakemelding from '../tilbakemelding/Tilbakemelding';

interface Props {
    valgteAlternativer: GrunnleggendeBehov[];
    onChange: (behov: GrunnleggendeBehov[]) => void;
    iRegistreringsModus?: boolean;
}

const cls = bemHelper('grunnleggendeFerdigheter');

const GrunnleggendeFerdigheter = ({ valgteAlternativer, onChange, iRegistreringsModus }: Props) => {
    const skalViseTilbakemeldingsInput =
        iRegistreringsModus && valgteAlternativer.includes(GrunnleggendeBehov.AndreUtfordringer);

    return (
        <section className="blokk-s">
            <Ekspanderbartpanel apen tittel={grunnleggendeFerdigheterSpørsmål.tittel}>
                <p className="blokk-m">
                    Mange arbeidsgivere kan tilrettelegge for arbeidstakere som har utfordringer med
                    ferdigheter som for eksempel å snakke norsk.
                </p>
                <Fieldset legend={grunnleggendeFerdigheterSpørsmål.spørsmål}>
                    <div className={cls.element('alternativer')}>
                        <Flervalgsalternativer
                            spørsmål={grunnleggendeFerdigheterSpørsmål}
                            valgteAlternativer={valgteAlternativer}
                            onChange={onChange}
                        />
                    </div>
                </Fieldset>
                {skalViseTilbakemeldingsInput && <Tilbakemelding behov="GRUNNLEGGENDE" />}
            </Ekspanderbartpanel>
        </section>
    );
};

export default GrunnleggendeFerdigheter;
