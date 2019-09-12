import React, { FunctionComponent } from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useQueryState } from 'react-router-use-location-state';

const EgneKandidaterFilter: FunctionComponent = () => {
    const [kunEgne, setKunEgne] = useQueryState('kunEgne', false);

    return (
        <div className="blokk-xs">
            <Ekspanderbartpanel tittel="Kandidater" apen>
                <Checkbox
                    label="Kun egne kandidater"
                    checked={kunEgne}
                    onChange={() => setKunEgne(!kunEgne)}
                />
            </Ekspanderbartpanel>
        </div>
    );
};

export default EgneKandidaterFilter;
