import React, { FunctionComponent } from 'react';
import hakesirkel from './hakesirkel.svg';
import bemHelper from '../../../../../utils/bemHelper';

const cls = bemHelper('registrertBehov');

interface Props {
    tekst?: string;
    ingenBehov?: boolean;
}

const Behovspunkt: FunctionComponent<Props> = ({ tekst, ingenBehov }) => (
    <li className={cls.element('behovspunkt')}>
        {!ingenBehov && <img src={hakesirkel} className={cls.element('hakesirkel')} />}
        <span className={cls.element('behovstekst')}>
            {ingenBehov ? 'Ingen registrerte behov' : tekst}
        </span>
    </li>
);

export default Behovspunkt;
