import React, { FunctionComponent } from 'react';
import { Undertittel, Element } from 'nav-frontend-typografi';
import bemHelper from '../../../utils/bemHelper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import './slikFungererDet.less';

const cls = bemHelper('slikFungererDet');

interface Informasjonsbolk {
    tittel: string;
    punkter: string[];
    underbolk?: Informasjonsbolk;
}

const bolker: Informasjonsbolk[] = [
    {
        tittel: 'Hvorfor bruke verktøyet?',
        punkter: [
            'Du bidrar til å øke kandidatens muligheter i arbeidsmarkedet.',
            'Du øker sannsynligheten for at kandidatene får møte en arbeidsgiver som kan tilrettelegge for akkurat deres behov.',
        ],
    },
    {
        tittel: 'Hvordan bruke verktøyet?',
        punkter: [
            'I dette verktøyet kan du registrere tilretteleggingsbehov til kandidater på en strukturert måte. Når du registrerer en kandidat blir denne kandidaten søkbar for markedskontakter, som kan bruke verktøyet til å finne kandidater med tilretteleggingsbehov.',
            'Registreringen av tilretteleggingsbehov skal gjøres i forbindelse med en samtale.',
            'Du kan kun registrere tilretteleggingsbehov på kandidater du har tilgang til.',
        ],
    },
    {
        tittel: 'Hvem skal registreres?',
        punkter: [
            'Brukere som har som mål å skaffe arbeid.',
            'Brukere som skal eller har blitt vurdert etter § 14a som har gitt uttrykk for at de har helseutfordringer eller andre utfordringer.',
        ],
        underbolk: {
            tittel: 'Rettslig grunnlag',
            punkter: [
                'NAV sin plikt til å vurdere brukers behov for bistand for å komme i jobb, ref. NAV-loven §14a.',
                'NAV sitt ansvar for å bistå arbeidssøkere med å få jobb og arbeidsgivere med å skaffe arbeidskraft, ref. NAV-loven §4.',
            ],
        },
    },
    {
        tittel: 'Hvem skal ikke registreres?',
        punkter: [
            'Brukere med kode 6 og kode 7.',
            'Egne ansatte/habilitering.',
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

const SlikFungererDet: FunctionComponent = () => {
    const renderPunkter = (punkter: string[]) => (
        <ul className={cls.element('punktliste')}>
            {punkter.map(punkt => (
                <li className={cls.element('punkt')} key={punkt}>
                    {punkt}
                </li>
            ))}
        </ul>
    );

    return (
        <section className={cls.block}>
            <div className={cls.element('container')}>
                <Undertittel className={cls.element('tittel')}>Slik fungerer det</Undertittel>
                {bolker.map(bolk => (
                    <Ekspanderbartpanel border tittel={bolk.tittel} key={bolk.tittel}>
                        {renderPunkter(bolk.punkter)}
                        {bolk.underbolk && (
                            <>
                                <Element>{bolk.underbolk.tittel}</Element>
                                {renderPunkter(bolk.underbolk.punkter)}
                            </>
                        )}
                    </Ekspanderbartpanel>
                ))}
            </div>
        </section>
    );
};

export default SlikFungererDet;
