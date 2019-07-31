import React from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';

import './infoToggler.less';
import bemHelper from '../../utils/bemHelper';

const cls = bemHelper('infoToggler');

interface Props {
    children: React.ReactNode;
    onToggle: () => void;
    åpen?: boolean;
}

const InfoToggler = (props: Props) => {
    const { åpen = false, children, onToggle } = props;
    return (
        <button
            className={cls.block}
            type="button"
            onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
                evt.stopPropagation();
                evt.preventDefault();
                onToggle();
            }}
            aria-expanded={åpen}
        >
            <span className={cls.element('label')}>{children}</span>
            <NavFrontendChevron type={åpen ? 'opp' : 'ned'} />
        </button>
    );
};

export default InfoToggler;
