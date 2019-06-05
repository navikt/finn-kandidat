import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Link } from 'react-router-dom';

import { formaterDato } from '../../../utils/datoUtils';
import { hentRoute, AppRoute } from '../../../utils/paths';
import { KolonneID } from '../kolonnetitler/Kolonnetitler';
import bemHelper from '../../../utils/bemHelper';
import Kandidat from '../../../types/Kandidat';
import './kandidatliste.less';
import IngenKandidater from './IngenKandidater';

const cls = bemHelper('kandidatliste');

interface Props {
    filtrerteKandidater: Kandidat[];
    onClickKandidat: () => void;
}

const Kandidatliste = ({ filtrerteKandidater, onClickKandidat }: Props) => (
    <ul className={cls.block}>
        {filtrerteKandidater.length === 0 ? (
            <IngenKandidater årsak="Fant ingen kandidater" />
        ) : (
            filtrerteKandidater.map(kandidat => (
                <Kandidatrad key={kandidat.fnr} kandidat={kandidat} onClick={onClickKandidat} />
            ))
        )}
    </ul>
);

const Kandidatrad = ({ kandidat, onClick }: { kandidat: Kandidat; onClick: () => void }) => {
    const { fnr, sistEndret, sistEndretAv } = kandidat;

    const linkCreator = (props: React.HTMLProps<HTMLElement>) => (
        <Link className={props.className} to={props.href || '#'} onClick={() => onClick()}>
            {props.children}
        </Link>
    );

    return (
        <li className={cls.element('listElement')}>
            <LenkepanelBase
                href={hentRoute(AppRoute.SeKandidat, fnr)}
                className={cls.element('kandidat')}
                linkCreator={linkCreator}
            >
                <div className={cls.classNames(cls.element('rad'), 'lenkepanel__heading')}>
                    <span aria-labelledby={KolonneID.Fnr}>{fnr}</span>
                    <span aria-labelledby={KolonneID.SistEndret}>
                        {sistEndret && formaterDato(sistEndret)}
                    </span>
                    <span aria-labelledby={KolonneID.SistEndretAv}>{sistEndretAv}</span>
                </div>
            </LenkepanelBase>
        </li>
    );
};

export default Kandidatliste;
