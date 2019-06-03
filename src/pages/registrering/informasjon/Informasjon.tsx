import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Lesmerpanel from 'nav-frontend-lesmerpanel';

import bemHelper from '../../../utils/bemHelper';
import informasjonSirkel from './informasjonSirkel.svg';
import './informasjon.less';

const cls = bemHelper('informasjon');

const nedtrekksmenyTittel = 'Dette må du informere kandidaten om';
const nedtrekksmenyPunkter = [
    'Tilretteleggingsbehovene vil bli brukt til å øke kandidatens muligheter i arbeidsmarkedet.',
    'Ved å oppgi denne informasjonen øker sannsynligheten for at NAV finner en arbeidsgiver som kan tilrettelegge for kandidatens behov.',
    'Kandidaten kan få informasjonen om tilretteleggingsbehov slettet når han eller hun ønsker det ved å kontakte NAV.',
];

const Informasjon = () => {
    const intro = (
        <div className={cls.element('intro')}>
            <img className={cls.element('ikon')} src={informasjonSirkel} alt="" />
            Før du registrerer behovene til kandidaten er det viktig at du informerer kandidaten om
            hva informasjonen skal brukes til.
        </div>
    );

    return (
        <section className={cls.block}>
            <Lesmerpanel intro={intro} apneTekst={nedtrekksmenyTittel} lukkTekst="Lukk">
                <div className={cls.element('nedtrekksinnhold')}>
                    <Undertittel tag="h3">{nedtrekksmenyTittel}</Undertittel>
                    <ul className={cls.element('punktliste')}>
                        {nedtrekksmenyPunkter.map(punkt => (
                            <li className={cls.element('punkt')} key={punkt}>
                                {punkt}
                            </li>
                        ))}
                    </ul>
                </div>
            </Lesmerpanel>
        </section>
    );
};

export default Informasjon;
