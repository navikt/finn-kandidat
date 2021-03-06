import React, { useState, FormEvent, FunctionComponent } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { withRouter, RouteComponentProps } from 'react-router';

import { AppRoute, hentRoute } from '../../../../utils/paths';
import { Behov, Behovfelt } from '../../../../types/Behov';
import { endreKandidat, konverterKandidatTilApi } from '../../../../api/finnKandidatApi';
import { Kandidat } from '../../../../types/Kandidat';
import Arbeidsmiljø from '../../../registrering/arbeidsmiljø/Arbeidsmiljø';
import Arbeidstid from '../../../registrering/arbeidstid/Arbeidstid';
import Fysisk from '../../../registrering/fysisk/Fysisk';
import GrunnleggendeFerdigheter from '../../../registrering/grunnleggende-ferdigheter/GrunnleggendeFerdigheter';

interface OwnProps {
    kandidat: Kandidat;
    onKandidatChange: (kandidat: Kandidat) => void;
}

type Props = OwnProps & RouteComponentProps;

const EndreKandidat: FunctionComponent<Props> = props => {
    const [kandidat, setKandidat] = useState<Kandidat>(props.kandidat);
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const endreBehov = (behovfelt: Behovfelt, verdi: Behov[]) =>
        setKandidat({
            ...kandidat,
            [behovfelt]: verdi,
        });

    const onArbeidstidChange = (behov: Behov) => {
        const somArray = [behov];
        onBehovChange(Behovfelt.ArbeidstidBehov)(somArray);
    };

    const onBehovChange = (behovfelt: Behovfelt) => (verdi: Behov[]) =>
        endreBehov(behovfelt, verdi);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const kandidatTilApi = konverterKandidatTilApi(kandidat);
        setSubmitting(true);
        const respons = await endreKandidat(kandidatTilApi);
        setSubmitting(false);

        if (respons) {
            props.onKandidatChange(kandidat);
            props.history.push(hentRoute(AppRoute.SeKandidat, kandidat.aktørId));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Arbeidstid
                valgtAlternativ={kandidat.arbeidstidBehov[0]}
                onChange={onArbeidstidChange}
            />
            <Fysisk
                valgteAlternativer={kandidat.fysiskeBehov}
                onChange={onBehovChange(Behovfelt.FysiskeBehov)}
            />
            <Arbeidsmiljø
                valgteAlternativer={kandidat.arbeidsmiljøBehov}
                onChange={onBehovChange(Behovfelt.ArbeidsmiljøBehov)}
            />
            <GrunnleggendeFerdigheter
                valgteAlternativer={kandidat.grunnleggendeBehov}
                onChange={onBehovChange(Behovfelt.GrunnleggendeBehov)}
            />

            <Hovedknapp spinner={isSubmitting} htmlType="submit">
                Lagre endringer
            </Hovedknapp>
        </form>
    );
};

export default withRouter(EndreKandidat);
