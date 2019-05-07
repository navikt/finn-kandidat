import React, { FunctionComponent } from 'react';
import { APP_ROOT, AppRoute } from './utils/paths';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import Header from './components/header/Header';
import Oversikt from './pages/oversikt/Oversikt';
import Registrering from './pages/registrering/Registrering';
import FørDuBegynner from './pages/før-du-begynner/FørDuBegynner';
import './styles/app.less';

const App: FunctionComponent = () => (
    <div className="app">
        <Normaltekst tag="div">
            <Router basename={APP_ROOT}>
                <Header />

                <Switch>
                    <Route exact path={AppRoute.Oversikt} component={Oversikt} />
                    <Route exact path={`${AppRoute.Registrering}/:fnr`} component={Registrering} />
                    <Route exact path={AppRoute.FørDuBegynner} component={FørDuBegynner} />
                    <Redirect to={AppRoute.Oversikt} />
                </Switch>
            </Router>
        </Normaltekst>
    </div>
);

export default App;
