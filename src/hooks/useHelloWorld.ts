import { useState, useEffect } from 'react';
import { hentHelloWorld } from '../api/api';

const useHelloWorld = () => {
    useEffect(() => {
        const hentFraBackend = async () => {
            const tekst = await hentHelloWorld();
            console.log('Fra backend:', tekst);
        };

        hentFraBackend();
    }, []);
};

export default useHelloWorld;
