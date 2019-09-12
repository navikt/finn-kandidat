import React, { FunctionComponent } from 'react';
import { Element } from 'nav-frontend-typografi';

import { AlleBehov, Behov, Behovfelt } from '../../../types/Behov';
import { ArbeidsmiløKriterie, arbeidsmiløKriterier } from './kriterier/arbeidsmiljøKriterier';
import { ArbeidstidKriterie, arbeidstidKriterier } from './kriterier/arbeidstidKriterier';
import { fysiskeKriterier, FysiskKriterie } from './kriterier/fysiskeKriterier';
import { GrunnleggendeKriterie, grunnleggendeKriterier } from './kriterier/grunnleggendeKriterier';
import bemHelper from '../../../utils/bemHelper';
import EgneKandidaterFilter from './EgneKandidaterFilter';
import Filterboks from './filter/Filter';
import useValgteKriterier from './useValgteKriterier';
import './filtrering.less';
import { withRouter, RouteComponentProps } from 'react-router';

const cls = bemHelper('filtrering');

export type Kriterie =
    | ArbeidstidKriterie
    | FysiskKriterie
    | ArbeidsmiløKriterie
    | GrunnleggendeKriterie;

export type ValgteKriterier = AlleBehov;

const Filtrering: FunctionComponent<RouteComponentProps> = props => {
    const { history, location } = props;
    const { valgteKriterier, toggleValgtKriterie } = useValgteKriterier(history, location);

    const handleToggleKriterie = (behovfelt: Behovfelt) => (kriterie: Behov) => {
        toggleValgtKriterie(kriterie, behovfelt);
    };

    const slettAlleKriterier = () => {
        history.replace({ search: undefined });
    };

    return (
        <div className={cls.block}>
            <button onClick={slettAlleKriterier} className={cls.element('slettKnapp')}>
                <Element>Slett alle kriterier</Element>
            </button>

            <EgneKandidaterFilter />

            <Filterboks
                tittel="Arbeidstid"
                spørsmål="Finn kandidater som:"
                kriterier={arbeidstidKriterier}
                valgteKriterier={valgteKriterier.arbeidstidBehov}
                toggleKriterie={handleToggleKriterie(Behovfelt.ArbeidstidBehov)}
            />
            <Filterboks
                tittel="Fysisk tilrettelegging"
                spørsmål="Finn kandidater som har behov for:"
                kriterier={fysiskeKriterier}
                valgteKriterier={valgteKriterier[Behovfelt.FysiskeBehov]}
                toggleKriterie={handleToggleKriterie(Behovfelt.FysiskeBehov)}
            />
            <Filterboks
                tittel="Arbeidsmiljø"
                spørsmål="Finn kandidater som har behov for:"
                kriterier={arbeidsmiløKriterier}
                valgteKriterier={valgteKriterier[Behovfelt.ArbeidsmiljøBehov]}
                toggleKriterie={handleToggleKriterie(Behovfelt.ArbeidsmiljøBehov)}
            />
            <Filterboks
                tittel="Grunnleggende ferdigheter"
                spørsmål="Finn kandidater som har utfordringer med:"
                kriterier={grunnleggendeKriterier}
                valgteKriterier={valgteKriterier[Behovfelt.GrunnleggendeBehov]}
                toggleKriterie={handleToggleKriterie(Behovfelt.GrunnleggendeBehov)}
            />
        </div>
    );
};

export default withRouter(Filtrering);
