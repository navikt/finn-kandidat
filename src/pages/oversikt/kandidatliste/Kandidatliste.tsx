import React from 'react';

import { FiltrertKandidat } from '../filtrering/filtreringslogikk';
import bemHelper from '../../../utils/bemHelper';
import IngenKandidater from './IngenKandidater';
import Kandidatrad from './kandidatrad/Kandidatrad';
import './kandidatliste.less';

const cls = bemHelper('kandidatliste');

interface Props {
    antallValgteKriterier: number;
    filtrerteKandidater: FiltrertKandidat[];
    onClickKandidat: () => void;
}

const Kandidatliste = ({ filtrerteKandidater, onClickKandidat, antallValgteKriterier }: Props) => (
    <ul className={cls.block}>
        {filtrerteKandidater.length > 0 ? (
            filtrerteKandidater.map(kandidat => (
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
