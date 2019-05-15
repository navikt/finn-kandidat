import React, { FunctionComponent } from 'react';
import { APP_ROOT, AppRoute } from './utils/paths';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';

import FørDuBegynner from './pages/før-du-begynner/FørDuBegynner';
import Forside from './pages/forside/Forside';
import Header from './components/header/Header';
import Kandidatdetaljer from './pages/kandidat/Kandidatdetaljer';
import Oversikt from './pages/oversikt/Oversikt';
import Registrering from './pages/registrering/Registrering';
import './styles/app.less';

const App: FunctionComponent = () => (
    <div className="app">
        <Normaltekst tag="div">
            <Router basename={APP_ROOT}>
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
                    <Redirect to={AppRoute.Oversikt} />
                </Switch>
            </Router>
        </Normaltekst>
    </div>
);

export default App;
