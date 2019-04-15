import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import bemHelper from '../../utils/bemHelper';
import './routeBanner.less';

const cls = bemHelper('routeBanner');

interface Props {
    tittel: string;
    undertittel?: string;
}

const RouteBanner = ({ tittel, undertittel }: Props) => (
    <div role="banner" className={cls.classNames(cls.block, 'blokk-s')}>
        <Innholdstittel className={cls.element('tittel')}>{tittel}</Innholdstittel>
        {undertittel && (
            <Undertittel className={cls.element('undertittel')}>{undertittel}</Undertittel>
        )}
    </div>
);

export default RouteBanner;
