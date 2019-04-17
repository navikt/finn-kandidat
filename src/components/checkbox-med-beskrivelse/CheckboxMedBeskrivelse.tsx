import React from 'react';
import { CheckboxProps, Checkbox } from 'nav-frontend-skjema';
import bemHelper from '../../utils/bemHelper';
import './checkboxMedBeskrivelse.less';

const cls = bemHelper('checkboxMedBeskrivelse');

interface OwnProps {
    beskrivelse?: string;
}

type Props = OwnProps & CheckboxProps;

const CheckboxMedBeskrivelse = (props: Props) => {
    const { label, checked, onChange, beskrivelse } = props;
    return (
        <div>
            <Checkbox label={label} checked={checked} onChange={onChange} />
            {beskrivelse && <div className={cls.element('beskrivelse')}>{beskrivelse}</div>}
        </div>
    );
};

export default CheckboxMedBeskrivelse;
