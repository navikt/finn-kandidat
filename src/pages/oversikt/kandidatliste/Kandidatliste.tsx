import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Link } from 'react-router-dom';

import { KolonneID } from '../kolonnetitler/Kolonnetitler';
import bemHelper from '../../../utils/bemHelper';
import Kandidat from '../../../types/Kandidat';
import PanelMedTekst from '../../../components/panel-med-tekst/PanelMedTekst';
import Språk from '../../../types/Språk';
import './kandidatliste.less';
import { hentRoute, AppRoute } from '../../../utils/paths';

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
            <PanelMedTekst tekst="Ingen kandidater å vise" />
        ) : (
            filtrerteKandidater.map(kandidat => (
                <Kandidatrad key={kandidat.fnr} kandidat={kandidat} />
            ))
        )}
    </ul>
);

const Kandidatrad = ({ kandidat }: { kandidat: Kandidat }) => {
    const { fnr, sistEndret, sistEndretAv } = kandidat;

    const linkCreator = (props: React.HTMLProps<HTMLElement>) => (
        <Link className={props.className} to={props.href || '#'}>
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
                        {sistEndret &&
                            sistEndret.toLocaleDateString(Språk.Bokmål, sistEndretFormat)}
                    </span>
                    <span aria-labelledby={KolonneID.SistEndretAv}>{sistEndretAv}</span>
                </div>
            </LenkepanelBase>
        </li>
    );
};

export default Kandidatliste;
