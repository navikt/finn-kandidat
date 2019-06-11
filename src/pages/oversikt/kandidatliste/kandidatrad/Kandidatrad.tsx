import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Link } from 'react-router-dom';

import { FiltrertKandidat } from '../../filtrering/filtreringslogikk';
import { formaterDato } from '../../../../utils/datoUtils';
import { hentRoute, AppRoute } from '../../../../utils/paths';
import { KolonneID } from '../../kolonnetitler/Kolonnetitler';
import bemHelper from '../../../../utils/bemHelper';

const cls = bemHelper('kandidatliste');

interface Props {
    kandidat: FiltrertKandidat;
    onClick: () => void;
    antallValgteKriterier: number;
}

const Kandidatrad = ({ kandidat, onClick, antallValgteKriterier }: Props) => {
    const { fnr, sistEndret, sistEndretAv, matchendeKriterier } = kandidat;

    const linkCreator = (props: React.HTMLProps<HTMLElement>) => (
        <Link className={props.className} to={props.href || '#'} onClick={() => onClick()}>
            {props.children}
        </Link>
    );

    const antallMatchendeKriterier =
        matchendeKriterier.length > 0 && antallValgteKriterier > 0
            ? `${matchendeKriterier.length} av ${antallValgteKriterier}`
            : '—';

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
                    <span aria-labelledby={KolonneID.TreffPåKriterier}>
                        {antallMatchendeKriterier}
                    </span>
                </div>
            </LenkepanelBase>
        </li>
    );
};

export default Kandidatrad;
