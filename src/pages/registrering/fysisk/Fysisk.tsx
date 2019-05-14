import React, { FunctionComponent } from 'react';
import { FysiskBehov } from '../../../types/Behov';
import Flervalgsspørsmål from '../flervalgsspørsmål/Flervalgsspørsmål';
import fysiskSpørsmål from './fysiskSpørsmål';

interface Props {
    valgteAlternativer: FysiskBehov[];
    onChange: (fysiskBehov: FysiskBehov[]) => void;
}

const Fysisk: FunctionComponent<Props> = props => {
    return (
        <Flervalgsspørsmål
            spørsmål={fysiskSpørsmål}
            valgteAlternativer={props.valgteAlternativer}
            onChange={props.onChange}
        />
    );
};

export default Fysisk;
