import React, { useState, useLayoutEffect } from 'react';

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

const Kandidatliste = ({ kandidater, onClickKandidat, antallValgteKriterier }: Props) => {
    const [visKandidater, toggleVisKandidater] = useState<boolean>(true);

    useLayoutEffect(() => {
        toggleVisKandidater(false);

        setTimeout(() => {
            toggleVisKandidater(true);
        });
    }, [kandidater]);

    return (
        <ul className={cls.classNames(cls.block, { [cls.modifier('vis')]: visKandidater })}>
            {kandidater.length > 0 ? (
                kandidater.map(kandidat => (
                    <li key={kandidat.fnr} className={cls.element('listElement')}>
                        <Kandidatrad
                            kandidat={kandidat}
                            onClick={onClickKandidat}
                            antallValgteKriterier={antallValgteKriterier}
                        />
                    </li>
                ))
            ) : (
                <IngenKandidater årsak="Fant ingen kandidater" />
            )}
        </ul>
    );
};

export default Kandidatliste;
