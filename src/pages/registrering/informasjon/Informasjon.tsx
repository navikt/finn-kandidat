import React from 'react';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import bemHelper from '../../../utils/bemHelper';
import './informasjon.less';
import informasjonSirkel from './informasjonSirkel.svg';

const cls = bemHelper('informasjon');

const Informasjon = () => {
    const intro = (
        <div className={cls.element('intro')}>
            <img className={cls.element('ikon')} src={informasjonSirkel} alt=""/>
            Før du registrerer behovene til kandidaten er det viktig at du informerer kandidaten om
            hva informasjonen skal brukes til.
        </div>
    );

    return (
        <section className={cls.block}>
            <Lesmerpanel
                intro={intro}
                apneTekst="Dette må du informere kandidaten om"
                lukkTekst="Lukk"
            >
                Her kommer det noe mer informasjon
            </Lesmerpanel>
        </section>
    );
};

export default Informasjon;
