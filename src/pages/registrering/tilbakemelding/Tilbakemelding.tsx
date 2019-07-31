import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { sendTilbakemelding } from '../../../api/finnKandidatApi';
import AlertStripe from 'nav-frontend-alertstriper';
import './tilbakemelding.less';
import bemHelper from '../../../utils/bemHelper';

export type LovligeBehov = 'ARBEIDSMILJØ' | 'ARBEIDSTID' | 'FYSISK' | 'GRUNNLEGGENDE';

const cls = bemHelper('tilbakemelding');

interface Props {
    behov: LovligeBehov;
}

const Tilbakemelding: FunctionComponent<Props> = ({ behov }) => {
    const [tilbakemelding, setTilbakemelding] = useState<string>('');
    const [tilbakemeldingSendt, setTilbakemeldingSendt] = useState<boolean>(false);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);

    const onChange = (event: any) => {
        setFeilmelding(undefined);
        const verdi = event.target.value;
        if (verdi.length <= 50) {
            setTilbakemelding(verdi);
        }
    };

    const onClick = () => {
        if (tilbakemelding.trim().length === 0) {
            setFeilmelding('Vennligst fyll ut et forslag');
        } else {
            sendTilbakemelding(tilbakemelding, behov);
            setTilbakemeldingSendt(true);
        }
    };

    return (
        <div className={cls.block}>
            {tilbakemeldingSendt ? (
                <AlertStripe type="suksess">Takk for din tilbakemelding</AlertStripe>
            ) : (
                <>
                    <Input
                        label="Savner du et alternativ? Send oss et forslag. Forslaget blir kun brukt til videreutvikling av verktøyet."
                        value={tilbakemelding}
                        onChange={onChange}
                        feil={feilmelding ? { feilmelding } : undefined}
                    />
                    <Knapp htmlType="button" mini={true} onClick={onClick}>
                        Gi tilbakemelding
                    </Knapp>
                </>
            )}
        </div>
    );
};

export default Tilbakemelding;
