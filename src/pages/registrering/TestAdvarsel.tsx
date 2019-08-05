import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

const TestAdvarsel = () => {
    return (
        <>
            {process.env.REACT_APP_ON_HEROKU && (
                <AlertStripeAdvarsel>
                    <b>Dette er en testversjon.</b>
                    <br />
                    Skal du registrere eller søke etter kandidater? Åpne denne lenken i Chrome SKSS.{' '}
                    <br />
                    https://arbeidsgiver.nais.adeo.no/finn-kandidat/
                </AlertStripeAdvarsel>
            )}
        </>
    );
};

export default TestAdvarsel;
