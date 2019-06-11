import React, { FunctionComponent, useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import { RouteComponentProps, withRouter } from 'react-router';

import { ArbeidsmiløKriterie, arbeidsmiløKriterier } from './kriterier/arbeidsmiljøKriterier';
import { ArbeidstidKriterie, arbeidstidKriterier } from './kriterier/arbeidstidKriterier';
import { Behov, Behovfelt, AlleBehov } from '../../../types/Behov';
import { fysiskeKriterier, FysiskKriterie } from './kriterier/fysiskeKriterier';
import { GrunnleggendeKriterie, grunnleggendeKriterier } from './kriterier/grunnleggendeKriterier';
import { hentFilterFraUrl, lagQueryParams } from './filtreringslogikk';
import { hentBehovfeltMedTommeLister } from '../../../utils/behovUtils';
import bemHelper from '../../../utils/bemHelper';
import Filter from './filter/Filter';
import './filtrering.less';

const cls = bemHelper('filtrering');

export type Kriterie =
    | ArbeidstidKriterie
    | FysiskKriterie
    | ArbeidsmiløKriterie
    | GrunnleggendeKriterie;

export type ValgteKriterier = AlleBehov;

const Filtrering: FunctionComponent<RouteComponentProps> = props => {
    const defaultValgteKriterier = hentBehovfeltMedTommeLister();

    const [valgteKriterier, setValgteKriterier] = useState<ValgteKriterier>(defaultValgteKriterier);

    useEffect(() => {
        const urlParams = location.search;
        const filtrering = hentFilterFraUrl(urlParams);
        setValgteKriterier(filtrering);
    }, [location.search]);

    const endreValgteKriterier = (behov: Behov, checked: boolean, behovfelt: Behovfelt) => {
        const urlParams = location.search;

        let filterFraUrl: any = hentFilterFraUrl(urlParams);

        const kriterieIkkeIUrl = !filterFraUrl[behovfelt].includes(behov);
        if (checked && kriterieIkkeIUrl) {
            filterFraUrl[behovfelt].push(behov);
        } else {
            filterFraUrl[behovfelt] = filterFraUrl[behovfelt].filter(
                (filter: Behov) => filter !== behov
            );
        }

        const queryParams = lagQueryParams(filterFraUrl);
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
