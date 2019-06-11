import React from 'react';

import { FiltrertKandidat } from '../filtrering/filtreringslogikk';
import bemHelper from '../../../utils/bemHelper';
import IngenKandidater from './IngenKandidater';
import Kandidatrad from './kandidatrad/Kandidatrad';
import './kandidatliste.less';

const cls = bemHelper('kandidatliste');

interface Props {
    antallValgteKriterier: number;
    kandidater: FiltrertKandidat[];
    onClickKandidat: () => void;
}

const Kandidatliste = ({ kandidater, onClickKandidat, antallValgteKriterier }: Props) => (
    <ul className={cls.block}>
        {kandidater.length > 0 ? (
            kandidater.map(kandidat => (
                <Kandidatrad
                    key={kandidat.fnr}
                    kandidat={kandidat}
                    onClick={onClickKandidat}
                    antallValgteKriterier={antallValgteKriterier}
                />
            ))
        ) : (
            <IngenKandidater årsak="Fant ingen kandidater" />
        )}
    </ul>
);

export default Kandidatliste;
