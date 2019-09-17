import axios from 'axios';
import uuid from 'uuid';

const redirectTilOpenAMLogin = () => {
    // TODO: fiks dette
    const iTestmiljø = true;

    const randomId = uuid.v4();
    if (iTestmiljø) {
        const redirectUrl = encodeURIComponent(
            'https://arbeidsgiver.nais.preprod.local/finn-kandidat/'
        );
        document.cookie = `state_${randomId}=${redirectUrl}`;
        window.location.href = `https://isso-q.adeo.no/isso/oauth2/authorize?session=winssochain&authIndexType=service&authIndexValue=winssochain&response_type=code&scope=openid&client_id=veilarblogin-q0&state=state_${randomId}&redirect_uri=https://app-q0.adeo.no/veilarblogin/api/login`;
    } else {
        const redirectUrl = encodeURIComponent('https://arbeidsgiver.nais.adeo.no/finn-kandidat/');
        document.cookie = `state_${randomId}=${redirectUrl}`;
        window.location.href = `https://isso.adeo.no/isso/oauth2/authorize?session=winssochain&authIndexType=service&authIndexValue=winssochain&response_type=code&scope=openid&client_id=veilarblogin-p&state=state_${randomId}&redirect_uri=https://app.adeo.no/veilarblogin/api/login`;
    }
};

const api = axios.create({
    withCredentials: true,
    timeout: 30000,
});

api.interceptors.response.use(
    response => {
        console.log('Fikk response: ', response);
        return response;
    },
    error => {
        console.log('feil i aktørregisterinterceptor. error: ', error);
        if (error.response) {
            console.log('error.response');
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log('error.request');
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('else Error', error.message);
        }
        console.log('error.config');
        console.log(error.config);

        console.log('redirecter til openam');
        redirectTilOpenAMLogin();

        // if (error.response.status === 403) {
        //     if (process.env.REACT_APP_MOCK) {
        //         console.log('redirecter til openam');
        //     } else {
        //         console.log('403 feil fra aktørregister, redirecter til OpenAM. error: ', error);
        //         redirectTilOpenAMLogin();
        //     }
        // } else {
        //     console.log('annen feil fra atkørregister, redirecter til OpenAM. error: ', error);
        //     redirectTilOpenAMLogin();
        //     return Promise.reject(error);
        // }
    }
);

export const aktørregisterApi = api;
