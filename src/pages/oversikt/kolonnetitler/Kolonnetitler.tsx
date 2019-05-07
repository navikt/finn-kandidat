import React, { ReactNode } from 'react';
import bemHelper from '../../../utils/bemHelper';
import './kolonnetitler.less';

const cls = bemHelper('kolonnetitler');

export enum KolonneID {
    Fnr = 'kandidatFnr',
    SistEndret = 'kandidatSistEndret',
    SistEndretAv = 'kandidatSistEndretAv',
}

const Kolonnetitler = () => (
    <div className={cls.block}>
        <div className={cls.element('inner')}>
            <Tittel id={KolonneID.Fnr}>Fødselsnummer</Tittel>
            <Tittel id={KolonneID.SistEndret}>Sist endret</Tittel>
            <Tittel id={KolonneID.SistEndretAv}>Sist endret av</Tittel>
        </div>
    </div>
);

const Tittel = ({ id, children }: { id: string; children: ReactNode }) => (
    <div id={id} className={cls.classNames(cls.element('tittel'), 'typo-element')}>
        {children}
    </div>
);

export default Kolonnetitler;
