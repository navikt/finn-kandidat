import React, { FunctionComponent, useEffect, useState } from 'react';
import { hentHelloWorld } from './api/api';
import './app.less';

const App: FunctionComponent = () => {
    const [helloWorld, settHelloWorld] = useState('');
    useEffect(() => {
        const hentFraBackend = async () => {
            const tekst = await hentHelloWorld();
            settHelloWorld(tekst);
        };
        hentFraBackend();
    }, []);

    return (
        <div className="app">
            <header className="app--header">
                <h1>Finn kandidat</h1>
                <h2>Fra backend: {helloWorld}</h2>
            </header>
        </div>
    );
};

export default App;
