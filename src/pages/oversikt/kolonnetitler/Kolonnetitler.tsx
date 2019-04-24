import React, { ReactNode } from 'react';
import bemHelper from '../../../utils/bemHelper';
import './kolonnetitler.less';

const cls = bemHelper('kolonnetitler');

export enum KolonneID {
    FNR = 'kandidatFnr',
    SIST_ENDRET = 'kandidatSistEndret',
    SIST_ENDRET_AV = 'kandidatSistEndretAv',
}

const Kolonnetitler = () => (
    <div className={cls.block}>
        <div className={cls.element('inner')}>
            <Tittel id={KolonneID.FNR}>Fødselsnummer</Tittel>
            <Tittel id={KolonneID.SIST_ENDRET}>Sist endret</Tittel>
            <Tittel id={KolonneID.SIST_ENDRET_AV}>Sist endret av</Tittel>
        </div>
    </div>
);

const Tittel = ({ id, children }: { id: string; children: ReactNode }) => (
    <div id={id} className={cls.classNames(cls.element('tittel'), 'typo-element')}>
        {children}
    </div>
);

export default Kolonnetitler;
