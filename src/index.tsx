import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'nav-frontend-modal';

import App from './App';
import './styles/index.less';

if (process.env.REACT_APP_MOCK) {
    require('./mocking/mockApi');
}

const rootElement = document.getElementById('root');

Modal.setAppElement(rootElement);
ReactDOM.render(<App />, rootElement);
