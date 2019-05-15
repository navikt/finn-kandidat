import React, { FunctionComponent, useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import bemHelper from '../../../utils/bemHelper';
import './filtrering.less';
import { GrunnleggendeKriterie, grunnleggendeKriterier } from './kriterier/grunnleggendeKriterier';
import { ArbeidstidKriterie, arbeidstidKriterier } from './kriterier/arbeidstidKriterier';
import Filter from './filter/Filter';
import { fysiskeKriterier, FysiskKriterie } from './kriterier/fysiskeKriterier';
import { Behov, Behovfelt } from '../../../types/Behov';
import { ArbeidsmiløKriterie, arbeidsmiløKriterier } from './kriterier/arbeidsmiljøKriterier';
import { RouteComponentProps, withRouter } from 'react-router';
import { hentFiltreringFraUrl, lagQueryParams } from './filtreringslogikk';

const cls = bemHelper('filtrering');

export type Kriterie =
    | ArbeidstidKriterie
    | FysiskKriterie
    | ArbeidsmiløKriterie
    | GrunnleggendeKriterie;

export interface ValgteKriterier {
    arbeidstidBehov: Behov[];
    fysiskeBehov: Behov[];
    arbeidsmiljøBehov: Behov[];
    grunnleggendeBehov: Behov[];
}

const Filtrering: FunctionComponent<RouteComponentProps> = props => {
    const defaultValgteKriterier: ValgteKriterier = {
        arbeidstidBehov: [],
        fysiskeBehov: [],
        arbeidsmiljøBehov: [],
        grunnleggendeBehov: [],
    };

    const [valgteKriterier, setValgteKriterier] = useState<ValgteKriterier>(defaultValgteKriterier);

    useEffect(
        () => {
            const urlParams = location.search;
            const filtrering = hentFiltreringFraUrl(urlParams);
            setValgteKriterier(filtrering);
        },
        [location.search]
    );

    const endreValgteKriterier = (behov: Behov, checked: boolean, type: Behovfelt) => {
        const urlParams = location.search;
        let kriterierIUrl: any = hentFiltreringFraUrl(urlParams);

        const kriterieIkkeIUrl = !kriterierIUrl[type].includes(behov);
        if (checked && kriterieIkkeIUrl) {
            kriterierIUrl[type].push(behov);
        } else {
            kriterierIUrl[type] = kriterierIUrl[type].filter((filter: Behov) => filter !== behov);
        }

        const queryParams = lagQueryParams(kriterierIUrl);
        props.history.replace({ search: queryParams });
    };

    const onSlettAlleKlikk = () => {
        props.history.replace({ search: '' });
    };

    return (
        <div className={cls.block}>
            <button onClick={onSlettAlleKlikk} className={cls.element('slettKnapp')}>
                <Element>Slett alle kriterier</Element>
            </button>

            <Filter
                tittel="Arbeidstid"
                spørsmål="Finn kandidater som:"
                type={Behovfelt.ArbeidstidBehov}
                kriterier={arbeidstidKriterier}
                valgteKriterier={valgteKriterier.arbeidstidBehov}
                endreValgteKriterier={endreValgteKriterier}
            />
            <Filter
                tittel="Fysisk tilrettelegging"
                spørsmål="Finn kandidater som har behov for:"
                type={Behovfelt.FysiskeBehov}
                kriterier={fysiskeKriterier}
                valgteKriterier={valgteKriterier[Behovfelt.FysiskeBehov]}
                endreValgteKriterier={endreValgteKriterier}
            />
            <Filter
                tittel="Arbeidsmiljø"
                spørsmål="Finn kandidater som har behov for:"
                type={Behovfelt.ArbeidsmiljøBehov}
                kriterier={arbeidsmiløKriterier}
                valgteKriterier={valgteKriterier[Behovfelt.ArbeidsmiljøBehov]}
                endreValgteKriterier={endreValgteKriterier}
            />
            <Filter
                tittel="Grunnleggende ferdigheter"
                spørsmål="Finn kandidater som har utfordringer med:"
                type={Behovfelt.GrunnleggendeBehov}
                kriterier={grunnleggendeKriterier}
                valgteKriterier={valgteKriterier[Behovfelt.GrunnleggendeBehov]}
                endreValgteKriterier={endreValgteKriterier}
            />
        </div>
    );
};

export default withRouter(Filtrering);
