import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import bemHelper from '../../../utils/bemHelper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import './slikFungererDet.less';

const cls = bemHelper('slikFungererDet');

interface Informasjonsbolk {
    tittel: string;
    punkter: string[];
}

const bolker: Informasjonsbolk[] = [
    {
        tittel: 'Hvordan bruke verktøyet?',
        punkter: [
            'I dette verktøyet kan du registrere tilretteleggingsbehov til kandidater på en strukturert måte. Når du registrerer en kandidat blir denne kandidaten søkbar for markedskontakter, som kan bruke verktøyet til å finne kandidater med tilretteleggingsbehov.',
            'Registreringen av tilretteleggingsbehov skal gjøres i forbindelse med en samtale.',
            'Du kan kun registrere tilretteleggingsbehov på dine egne kandidater.',
        ],
    },
    {
        tittel: 'Hvem skal registreres?',
        punkter: [
            'Brukere som har som mål å skaffe arbeid.',
            'Brukere som skal eller har blitt vurdert etter § 14a som har gitt uttrykk for at de har helse- eller andre utfordringer.',
        ],
    },
    {
        tittel: 'Hvor ofte skal tilretteleggingsbehovene oppdateres?',
        punkter: [
            'Når behovene til kandidaten endrer seg.',
            'Dersom målet endres fra «beholde» til «skaffe» arbeid.',
        ],
    },
    {
        tittel: 'Når skal tilretteleggingsbehovene slettes?',
        punkter: [
            'Når bruker ikke lenger er under arbeidsrettet oppfølging fra NAV.',
            'Når bruker ber om det, uavhengig av årsak.',
            'Når bruker ikke lenger har noen tilretteleggingsbehov.',
        ],
    },
];

const SlikFungererDet: FunctionComponent = () => (
    <section className={cls.block}>
        <div className={cls.element('container')}>
            <Undertittel className={cls.element('tittel')}>Slik fungerer det</Undertittel>
            {bolker.map(bolk => (
                <Ekspanderbartpanel border tittel={bolk.tittel} key={bolk.tittel}>
                    <ul className={cls.element('punktliste')}>
                        {bolk.punkter.map(punkt => (
                            <li className={cls.element('punkt')} key={punkt}>
                                {punkt}
                            </li>
                        ))}
                    </ul>
                </Ekspanderbartpanel>
            ))}
        </div>
    </section>
);

export default SlikFungererDet;
