import React, { FunctionComponent } from 'react';
import { APP_ROOT, AppRoute } from './utils/paths';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';

import { AppContextProvider } from './utils/AppContext';
import { FilterContextProvider } from './pages/oversikt/filtrering/filter-context/FilterContext';
import FørDuBegynner from './pages/før-du-begynner/FørDuBegynner';
import Forside from './pages/forside/Forside';
import Header from './components/header/Header';
import Kandidatdetaljer from './pages/kandidat/Kandidatdetaljer';
import Oversikt from './pages/oversikt/Oversikt';
import Registrering from './pages/registrering/Registrering';
import TestAdvarsel from './pages/registrering/TestAdvarsel';
import IngenTilgang from './pages/ingen-tilgang/IngenTilgang';
import './styles/app.less';

const App: FunctionComponent = () => (
    <div className="app">
        <Normaltekst tag="div">
            <AppContextProvider>
                <FilterContextProvider>
                    <Router basename={APP_ROOT}>
                        <TestAdvarsel />

                        <Header />
                        <Switch>
                            <Route exact path={AppRoute.Forside} component={Forside} />
                            <Route exact path={AppRoute.Oversikt} component={Oversikt} />
                            <Route exact path={AppRoute.FørDuBegynner} component={FørDuBegynner} />
                            <Route exact path={AppRoute.Registrering} component={Registrering} />
                            <Route
                                exact
                                path={AppRoute.EndreKandidat}
                                render={() => <Kandidatdetaljer iEndremodus />}
                            />
                            <Route exact path={AppRoute.SeKandidat} component={Kandidatdetaljer} />
                            <Route exact path={AppRoute.IngenTilgang} component={IngenTilgang} />
                            <Redirect to={AppRoute.Oversikt} />
                        </Switch>
                    </Router>
                </FilterContextProvider>
            </AppContextProvider>
        </Normaltekst>
    </div>
);

export default App;
