import React from 'react';
import { Link } from 'react-router-dom';
import { VenstreChevron } from 'nav-frontend-chevron';
import bemHelper from '../../utils/bemHelper';
import './tilbake.less';

const cls = bemHelper('tilbake');

interface Props {
    til: string;
}

const Tilbake = ({ til }: Props) => (
    <Link to={til} className={cls.block} aria-label="Gå tilbake">
        <VenstreChevron className={cls.element('icon')} />
        Tilbake
    </Link>
);

export default Tilbake;
