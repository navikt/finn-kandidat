import React, { FunctionComponent } from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import bemHelper from '../../../utils/bemHelper';
import './fnrInput.less';
import { Input } from 'nav-frontend-skjema';
import { midlertidigGyldigFnr } from './fnrUtils';

const cls = bemHelper('fnrInput');

interface Props {
    fnr: string;
    setFnr: (fnr: string) => void;
    feilmelding?: string;
}

const FnrInput: FunctionComponent<Props> = ({ fnr, setFnr, feilmelding }) => {
    const onChange = (event: any) => {
        const verdi = event.currentTarget.value;
        if (midlertidigGyldigFnr(verdi)) {
            setFnr(verdi);
        }
    };

    return (
        <div className={cls.block}>
            <Undertittel className="blokk-s">
                Registrer eller endre tilretteleggingsbehov
            </Undertittel>
            <Normaltekst className="blokk-m">
                Du kan kun registrere eller endre tilretteleggingsbehov til kandidater du har
                tilgang til.
            </Normaltekst>
            <Input
                className={cls.element('input')}
                value={fnr}
                onChange={onChange}
                label="Kandidatens fødselsnummer"
                feil={feilmelding ? { feilmelding } : undefined}
            />
        </div>
    );
};

export default FnrInput;
