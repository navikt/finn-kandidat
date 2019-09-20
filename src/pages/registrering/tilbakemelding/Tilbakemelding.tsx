import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { sendTilbakemelding } from '../../../api/finnKandidatApi';
import AlertStripe from 'nav-frontend-alertstriper';
import './tilbakemelding.less';
import bemHelper from '../../../utils/bemHelper';
import UtvidetInformasjon from '../../../components/utvidetinformasjon/UtvidetInformasjon';

export enum Behov {
    Arbeidsmiljø = 'ARBEIDSMILJØ',
    Arbeidstid = 'ARBEIDSTID',
    Fysisk = 'FYSISK',
    Grunnleggende = 'GRUNNLEGGENDE',
}
export type LovligeBehov =
    | Behov.Arbeidsmiljø
    | Behov.Arbeidstid
    | Behov.Fysisk
    | Behov.Grunnleggende;

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
        if (verdi.length <= 100) {
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
        <UtvidetInformasjon åpneLabel="Savner du et alternativ?" lukkLabel="Lukk">
            <div className={cls.element('innhold')}>
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
        </UtvidetInformasjon>
    );
};

export default Tilbakemelding;
