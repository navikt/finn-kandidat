import React, { useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import bemHelper from '../../../utils/bemHelper';
import './filtrering.less';
import { GrunnleggendeKriterie, grunnleggendeKriterier } from './kriterier/grunnleggendeKriterier';
import { ArbeidstidKriterie, arbeidstidKriterier } from './kriterier/arbeidstidKriterier';
import Filter from './filter/Filter';
import { fysiskeKriterier, FysiskKriterie } from './kriterier/fysiskeKriterier';
import { Behov, Behovfelt } from '../../../types/Behov';
import { ArbeidsmiløKriterie, arbeidsmiløKriterier } from './kriterier/arbeidsmiljøKriterier';

const cls = bemHelper('filtrering');

export type Kriterie =
    | ArbeidstidKriterie
    | FysiskKriterie
    | ArbeidsmiløKriterie
    | GrunnleggendeKriterie;

interface ValgteKriterier {
    arbeidstidBehov: Behov[];
    fysiskeBehov: Behov[];
    arbeidsmiljøBehov: Behov[];
    grunnleggendeBehov: Behov[];
}

const Filtrering = () => {
    const defaultValgteKriterier: ValgteKriterier = {
        [Behovfelt.arbeidstidBehov]: [],
        [Behovfelt.fysiskeBehov]: [],
        [Behovfelt.arbeidsmiljøBehov]: [],
        [Behovfelt.grunnleggendeBehov]: [],
    };

    const [valgteKriterier, setValgteKriterier] = useState<ValgteKriterier>(defaultValgteKriterier);

    const endreValgteKriterier = (behov: Behov, checked: boolean, type: Behovfelt) => {
        if (checked) {
            valgteKriterier[type].push(behov);
        } else {
            valgteKriterier[type] = valgteKriterier[type].filter(
                (alternativIListe: any) => alternativIListe !== behov
            );
        }
        setValgteKriterier({ ...valgteKriterier });
    };

    const onSlettAlleKlikk = () => {
        setValgteKriterier(defaultValgteKriterier);
    };

    return (
        <div className={cls.block}>
            <button onClick={onSlettAlleKlikk} className={cls.element('slettKnapp')}>
                <Element>Slett alle kriterier</Element>
            </button>

            <Filter
                tittel="Arbeidstid"
                spørsmål="Finn kandidater som:"
                type={Behovfelt.arbeidstidBehov}
                kriterier={arbeidstidKriterier}
                valgteKriterier={valgteKriterier.arbeidstidBehov}
                endreValgteKriterier={endreValgteKriterier}
            />
            <Filter
                tittel="Fysisk tilrettelegging"
                spørsmål="Finn kandidater som har behov for:"
                type={Behovfelt.fysiskeBehov}
                kriterier={fysiskeKriterier}
                valgteKriterier={valgteKriterier[Behovfelt.fysiskeBehov]}
                endreValgteKriterier={endreValgteKriterier}
            />
            <Filter
                tittel="Arbeidsmiljø"
                spørsmål="Finn kandidater som har behov for:"
                type={Behovfelt.arbeidsmiljøBehov}
                kriterier={arbeidsmiløKriterier}
                valgteKriterier={valgteKriterier[Behovfelt.arbeidsmiljøBehov]}
                endreValgteKriterier={endreValgteKriterier}
            />
            <Filter
                tittel="Grunnleggende ferdigheter"
                spørsmål="Finn kandidater som har utfordringer med:"
                type={Behovfelt.grunnleggendeBehov}
                kriterier={grunnleggendeKriterier}
                valgteKriterier={valgteKriterier[Behovfelt.grunnleggendeBehov]}
                endreValgteKriterier={endreValgteKriterier}
            />
        </div>
    );
};

export default Filtrering;
