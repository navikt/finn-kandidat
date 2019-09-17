import React, {
    createContext,
    FunctionComponent,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { hentInnloggetVeileder } from '../api/finnKandidatApi';
import { hentAktørId } from '../api/aktørregister/aktørregisterApi';

interface AppState {
    navIdent?: string;
}

const AppContext = createContext<AppState>([] as any);

export const AppContextProvider: FunctionComponent = ({ children }) => {
    const [navIdent, setNavIdent] = useState<string>('');

    // redirect vil skje automatisk av interceptor
    // trenger bare kalle apiet så fikses ting av seg selv
    const sjekkOpenAMInnlogging = useCallback(async () => {
        try {
            console.log('Prøver å hente aktørid i appcontext');
            await hentAktørId('');
            console.log('funka');
        } catch (ignorert) {
            console.log('feilet å hente aktørid i appcontext. feil: ', ignorert);
        }
    }, []);

    const sjekkAzureInnlogging = useCallback(async () => {
        try {
            const navIdent = await hentInnloggetVeileder();
            setNavIdent(navIdent);
        } catch (ignorert) {}
    }, []);

    useEffect(() => {
        sjekkOpenAMInnlogging();
        sjekkAzureInnlogging();
    }, [sjekkOpenAMInnlogging, sjekkAzureInnlogging]);

    return <AppContext.Provider value={{ navIdent }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
