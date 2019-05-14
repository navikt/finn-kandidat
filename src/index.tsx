import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.less';

if (process.env.REACT_APP_MOCK) {
    require('./mocking/mockApi');
}

ReactDOM.render(<App />, document.getElementById('root'));
