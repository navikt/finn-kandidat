import React, {
    createContext,
    FunctionComponent,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { hentInnloggetVeileder } from '../api/finnKandidatApi';

interface AppState {
    navIdent?: string;
}

const AppContext = createContext<AppState>([] as any);

export const AppContextProvider: FunctionComponent = ({ children }) => {
    const [appState, setAppState] = useState<AppState>({});

    const hentAppState = async () => {
        const navIdent = await hentInnloggetVeileder();

        setAppState({
            navIdent,
        });
    };

    const memoisertHentAppState = useCallback(hentAppState, []);

    useEffect(() => {
        hentAppState();
    }, [memoisertHentAppState]);

    return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
