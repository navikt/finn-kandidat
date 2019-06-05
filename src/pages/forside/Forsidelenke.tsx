import React, { FunctionComponent } from 'react';
import bemHelper from '../../utils/bemHelper';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Link } from 'react-router-dom';
import { Element } from 'nav-frontend-typografi';

const cls = bemHelper('forside');

interface Props {
    ikon: any;
    tekst: string;
    href: string;
    onClick?: () => void;
}

const Forsidelenke: FunctionComponent<Props> = ({ ikon, tekst, href, onClick }) => {
    const linkCreator = (props: React.HTMLProps<HTMLElement>) => (
        <Link className={props.className} to={props.href || '#'} onClick={onClick}>
            {props.children}
        </Link>
    );

    return (
        <LenkepanelBase
            border
            className={cls.element('lenke')}
            linkCreator={linkCreator}
            href={href}
        >
            <div className={cls.element('lenkeinnhold')}>
                <img src={ikon} className={cls.element('lenkeikon')} />
                <Element className="lenkepanel__heading">{tekst}</Element>
            </div>
        </LenkepanelBase>
    );
};

export default Forsidelenke;
