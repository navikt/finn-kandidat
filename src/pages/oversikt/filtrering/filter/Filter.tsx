import React, { FunctionComponent } from 'react';
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
    type: Behovfelt;
    kriterier: Kriterie[];
    valgteKriterier: Behov[];
    endreValgteKriterier: (behov: Behov, checked: boolean, type: Behovfelt) => void;
}

const Filter: FunctionComponent<Props> = ({
    tittel,
    spørsmål,
    type,
    kriterier,
    valgteKriterier,
    endreValgteKriterier,
}) => {
    return (
        <div className={cls.block}>
            <Ekspanderbartpanel tittel={tittel} apen>
                <Element className={cls.element('spørsmål')}>{spørsmål}</Element>
                {kriterier.map(kriterie => (
                    <Checkbox
                        label={kriterie.label}
                        checked={valgteKriterier.includes(kriterie.behov)}
                        onChange={(event: any) =>
                            endreValgteKriterier(kriterie.behov, event.currentTarget.checked, type)
                        }
                        key={kriterie.behov}
                    />
                ))}
            </Ekspanderbartpanel>
        </div>
    );
};

export default Filter;
