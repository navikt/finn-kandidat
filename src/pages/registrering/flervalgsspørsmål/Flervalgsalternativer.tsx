import React from 'react';
import Spørsmål from '../Spørsmål';
import CheckboxMedBeskrivelse from '../../../components/checkbox-med-beskrivelse/CheckboxMedBeskrivelse';
import { Behov } from '../../../types/Behov';

interface Props<T extends Behov> {
    spørsmål: Spørsmål<T>;
    valgteAlternativer: T[];
    onChange: (behov: T[]) => void;
}

class Flervalgsalternativer<T extends Behov> extends React.Component<Props<T>> {
    fjernSvar = (alternativ: T) =>
        this.props.onChange(this.props.valgteAlternativer.filter(valgt => valgt !== alternativ));

    leggTilSvar = (alternativ: T) =>
        this.props.onChange([...this.props.valgteAlternativer, alternativ]);

    onSvarClick = (alternativ: T) => () =>
        this.props.valgteAlternativer.includes(alternativ)
            ? this.fjernSvar(alternativ)
            : this.leggTilSvar(alternativ);

    render = () =>
        this.props.spørsmål.svaralternativer.map(({ behov, label, beskrivelse }) => (
            <CheckboxMedBeskrivelse
                key={label}
                label={label}
                beskrivelse={beskrivelse}
                checked={this.props.valgteAlternativer.includes(behov)}
                onChange={this.onSvarClick(behov)}
            />
        ));
}

export default Flervalgsalternativer;
