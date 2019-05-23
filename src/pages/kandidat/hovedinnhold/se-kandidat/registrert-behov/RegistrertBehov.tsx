import React, { FunctionComponent, ReactNode } from 'react';
import { Element } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

import { Behov } from '../../../../../types/Behov';
import Spørsmål from '../../../../registrering/Spørsmål';
import bemHelper from '../../../../../utils/bemHelper';
import Behovspunkt from './Behovspunkt';
import './registrertBehov.less';

const cls = bemHelper('registrertBehov');

interface Props {
    spørsmål: Spørsmål<Behov>;
    svar: Behov[];
}

const RegistrertBehov: FunctionComponent<Props> = ({ spørsmål, svar }) => {
    const hentBehovsbeskrivelse = (behov: Behov) => {
        return spørsmål.svaralternativer.find(a => a.behov === behov)!.label;
    };

    let registrerteSvar: ReactNode;
    if (svar.length > 0) {
        registrerteSvar = svar.map(behov => (
            <Behovspunkt key={behov} tekst={hentBehovsbeskrivelse(behov)} />
        ));
    } else {
        registrerteSvar = <Behovspunkt ingenBehov />;
    }

    return (
        <section className="blokk-xs">
            <Ekspanderbartpanel apen tittel={spørsmål.tittel}>
                <Element>{spørsmål.spørsmål}</Element>
                <ul className={cls.element('svarliste')}>{registrerteSvar}</ul>
            </Ekspanderbartpanel>
        </section>
    );
};

export default RegistrertBehov;
