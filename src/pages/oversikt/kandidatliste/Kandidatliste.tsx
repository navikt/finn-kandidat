import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';

import { KolonneID } from '../kolonnetitler/Kolonnetitler';
import bemHelper from '../../../utils/bemHelper';
import IngenKandidater from '../ingen-kandidater/IngenKandidater';
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
        {filtrerteKandidater.length === 0 ? (
            <IngenKandidater />
        ) : (
            filtrerteKandidater.map(kandidat => (
                <Kandidatrad key={kandidat.fnr} kandidat={kandidat} />
            ))
        )}
    </ul>
);

const Kandidatrad = ({ kandidat }: { kandidat: Kandidat }) => {
    const { fnr, sistEndret, sistEndretAv } = kandidat;

    return (
        <li className={cls.element('listElement')}>
            <LenkepanelBase className={cls.element('kandidat')} href={`#${fnr}`}>
                <div className={cls.classNames(cls.element('rad'), 'lenkepanel__heading')}>
                    <span aria-labelledby={KolonneID.FNR}>{fnr}</span>
                    <span aria-labelledby={KolonneID.SIST_ENDRET}>
                        {sistEndret &&
                            sistEndret.toLocaleDateString(Språk.Bokmål, sistEndretFormat)}
                    </span>
                    <span aria-labelledby={KolonneID.SIST_ENDRET_AV}>{sistEndretAv}</span>
                </div>
            </LenkepanelBase>
        </li>
    );
};

export default Kandidatliste;
