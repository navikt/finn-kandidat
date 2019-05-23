import React, { FunctionComponent, useState } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { RouteComponentProps, withRouter } from 'react-router';
import Modal from 'nav-frontend-modal';

import bemHelper from '../../../utils/bemHelper';
import { AppRoute } from '../../../utils/paths';
import { slettKandidat } from '../../../api/api';
import './slettKandidatModal.less';

const cls = bemHelper('slettKandidatModal');
const klartIkkeSlette = 'Vi klarte dessverre ikke å slette kandidaten.';

interface OwnProps {
    erÅpen: boolean;
    kandidatensFnr: string;
    lukk: () => void;
}

type Props = OwnProps & RouteComponentProps;

const SlettKandidatModal: FunctionComponent<Props> = props => {
    const { erÅpen, lukk, kandidatensFnr, history } = props;
    const [sletterKandidat, toggleSletterKandidat] = useState<boolean>(false);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);

    const slettKandidatOgLukk = async () => {
        try {
            toggleSletterKandidat(true);
            const harSlettetKandidat = await slettKandidat(kandidatensFnr);
            toggleSletterKandidat(false);

            if (harSlettetKandidat) {
                history.push(AppRoute.Oversikt);
            } else {
                setFeilmelding(klartIkkeSlette);
            }
        } catch (error) {
            toggleSletterKandidat(false);
            setFeilmelding(klartIkkeSlette);
        }
    };

    return (
        <Modal
            className={cls.block}
            closeButton
            isOpen={erÅpen}
            onRequestClose={lukk}
            contentLabel="Slett kandidat"
        >
            <Element className={cls.element('tekst')}>
                Er du sikker på at du vil slette tilretteleggingsbehovene til denne kandidaten?
            </Element>
            <div className={cls.element('knapper')}>
                <Hovedknapp spinner={sletterKandidat} onClick={slettKandidatOgLukk}>
                    Slett
                </Hovedknapp>
                <Knapp onClick={lukk}>Avbryt</Knapp>
            </div>
            {feilmelding && (
                <AlertStripeFeil className={cls.element('feilmelding')}>
                    {feilmelding}
                </AlertStripeFeil>
            )}
        </Modal>
    );
};

export default withRouter(SlettKandidatModal);
