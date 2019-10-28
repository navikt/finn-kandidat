import React, { FunctionComponent } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useQueryState } from 'react-router-use-location-state';
import { Select } from 'nav-frontend-skjema';
import { hentNavn } from '../../../../utils/kontorMapping';
import { UrlParameter } from '../filtreringslogikk';

export const ALLE_ENHETER = '';

interface Props {
    enheter: Set<string>;
}

const Enhetsfilter: FunctionComponent<Props> = ({ enheter }) => {
    const [valgtEnhet, setValgtEnhet] = useQueryState<string>(UrlParameter.Enhet, ALLE_ENHETER);

    const options = Array.from(enheter.values()).map(enhetsnr => (
        <option value={enhetsnr} key={enhetsnr}>
            {hentNavn(enhetsnr)}
        </option>
    ));

    return (
        <div className="blokk-xs">
            <Ekspanderbartpanel tittel="NAV-enhet" apen>
                <Select
                    label="Velg enhet"
                    value={valgtEnhet}
                    onChange={event => setValgtEnhet(event.currentTarget.value)}
                >
                    <option value={ALLE_ENHETER} key="alle">
                        Alle
                    </option>
                    {options}
                </Select>
            </Ekspanderbartpanel>
        </div>
    );
};

export default Enhetsfilter;
