import React, { FunctionComponent } from 'react';
import { APP_ROOT, AppRoute } from './utils/paths';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import Header from './components/header/Header';
import Oversikt from './pages/oversikt/Oversikt';
import Registrering from './pages/registrering/Registrering';
import './styles/app.less';
import useHelloWorld from './hooks/useHelloWorld';

const App: FunctionComponent = () => {
    useHelloWorld();

    return (
        <div className="app">
            <Normaltekst tag="div">
                <Router basename={APP_ROOT}>
                    <Header />

                    <Switch>
                        <Route exact path={AppRoute.OVERSIKT} component={Oversikt} />
                        <Route exact path={AppRoute.REGISTRERING} component={Registrering} />
                        <Redirect to={AppRoute.OVERSIKT} />
                    </Switch>
                </Router>
            </Normaltekst>
        </div>
    );
};

export default App;
