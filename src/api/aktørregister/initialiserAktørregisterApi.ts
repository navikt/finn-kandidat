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
    response => response,
    error => {
        if (error.response.status === 403) {
            if (process.env.REACT_APP_MOCK) {
                console.log('redirecter til openam');
            } else {
                redirectTilOpenAMLogin();
            }
        } else {
            return Promise.reject(error);
        }
    }
);

export const aktørregisterApi = api;
