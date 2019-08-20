import React from 'react';
import { Panel } from 'nav-frontend-paneler';
import Skeleton from 'react-loading-skeleton';

import bemHelper from '../../../utils/bemHelper';

const cls = bemHelper('kandidatliste');

const KandidatListeSkeleton = () => {
    const tomArray = [...Array(8)];

    return (
        <ul className={cls.classNames(cls.block, cls.modifier('vis'))}>
            {tomArray.map((_, i) => (
                <li key={i} className={cls.element('listElement')}>
                    <Panel className="lenkepanel">
                        <div className={cls.element('rad')}>
                            <Skeleton width={88} />
                            <Skeleton width={80} />
                            <Skeleton width={58} />
                            <Skeleton width={14} />
                        </div>
                        <span />
                    </Panel>
                </li>
            ))}
        </ul>
    );
};

export default KandidatListeSkeleton;
