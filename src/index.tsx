import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.less';

if (process.env.REACT_APP_MOCK) {
    require('./mocking/mock-api');
}

ReactDOM.render(<App />, document.getElementById('root'));
