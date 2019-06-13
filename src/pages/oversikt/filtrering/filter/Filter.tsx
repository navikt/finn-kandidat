import React, { FunctionComponent, SyntheticEvent } from 'react';
import { Kriterie } from '../Filtrering';
import { Element } from 'nav-frontend-typografi';
import bemHelper from '../../../../utils/bemHelper';
import './filter.less';
import { Checkbox } from 'nav-frontend-skjema';
import { Behov, Behovfelt } from '../../../../types/Behov';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

const cls = bemHelper('filter');

interface Props {
    tittel: string;
    spørsmål: string;
    kriterier: Kriterie[];
    valgteKriterier: Behov[];
    toggleKriterie: (behov: Behov) => void;
}

const Filter: FunctionComponent<Props> = ({
    tittel,
    spørsmål,
    kriterier,
    valgteKriterier,
    toggleKriterie,
}) => {
    return (
        <div className={cls.block}>
            <Ekspanderbartpanel tittel={tittel} apen>
                <Element className={cls.element('spørsmål')}>{spørsmål}</Element>
                {kriterier.map(kriterie => (
                    <Checkbox
                        label={kriterie.label}
                        checked={valgteKriterier.includes(kriterie.behov)}
                        onChange={() => toggleKriterie(kriterie.behov)}
                        key={kriterie.behov}
                    />
                ))}
            </Ekspanderbartpanel>
        </div>
    );
};

export default Filter;
