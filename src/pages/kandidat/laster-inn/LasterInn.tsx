import React, { FunctionComponent } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import bemHelper from '../../../utils/bemHelper';
import './lasterInn.less';

const cls = bemHelper('lasterInn');

const LasterInn: FunctionComponent = () => (
    <div className={cls.block}>
        <NavFrontendSpinner type="L" />
    </div>
);

export default LasterInn;
