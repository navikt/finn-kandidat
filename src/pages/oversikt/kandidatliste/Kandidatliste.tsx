import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';

import { KolonneID } from '../kolonnetitler/Kolonnetitler';
import bemHelper from '../../../utils/bemHelper';
import Kandidat from '../../../types/Kandidat';
import Språk from '../../../types/Språk';
import './kandidatliste.less';

const cls = bemHelper('kandidatliste');

const sistEndretFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

interface Props {
    filtrerteKandidater: Kandidat[];
}

const Kandidatliste = ({ filtrerteKandidater }: Props) => (
    <ul className={cls.block}>
        {filtrerteKandidater.map(({ fnr, sistEndret, sistEndretAv }) => (
            <li key={fnr} className={cls.element('listElement')}>
                <LenkepanelBase className={cls.element('kandidat')} href={`#${fnr}`}>
                    <div className={cls.classNames(cls.element('rad'), 'lenkepanel__heading')}>
                        <span aria-labelledby={KolonneID.FNR}>{fnr}</span>
                        <span aria-labelledby={KolonneID.SIST_ENDRET}>
                            {sistEndret.toLocaleDateString(Språk.BOKMÅL, sistEndretFormat)}
                        </span>
                        <span aria-labelledby={KolonneID.SIST_ENDRET_AV}>{sistEndretAv}</span>
                    </div>
                </LenkepanelBase>
            </li>
        ))}
    </ul>
);

export default Kandidatliste;
