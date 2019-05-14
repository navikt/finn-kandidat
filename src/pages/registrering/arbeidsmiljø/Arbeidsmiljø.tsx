import React, { FunctionComponent } from 'react';
import { ArbeidsmijøBehov } from '../../../types/Behov';
import Flervalgsspørsmål from '../flervalgsspørsmål/Flervalgsspørsmål';
import arbeidsmiljøSpørsmål from './arbeidsmiljøSpørsmål';

interface Props {
    valgteAlternativer: ArbeidsmijøBehov[];
    onChange: (arbeidsmiljøBehov: ArbeidsmijøBehov[]) => void;
}

const Arbeidsmiljø: FunctionComponent<Props> = props => {
    return (
        <Flervalgsspørsmål
            spørsmål={arbeidsmiljøSpørsmål}
            valgteAlternativer={props.valgteAlternativer}
            onChange={props.onChange}
        />
    );
};

export default Arbeidsmiljø;
