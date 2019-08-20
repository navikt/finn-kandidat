import React from 'react';
import Skeleton from 'react-loading-skeleton';
import bemHelper from '../../../../../utils/bemHelper';

const cls = bemHelper('registrertBehov');

const RegistrerteSvarSkeleton = () => (
    <div className={cls.element('behovspunkt')} aria-disabled={true}>
        <div className={cls.element('hakesirkel')}>
            <Skeleton circle height={18} width={18} />
        </div>
        <Skeleton width={300} />
    </div>
);

export default RegistrerteSvarSkeleton;
