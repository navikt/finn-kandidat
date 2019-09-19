import axios, { AxiosError, AxiosResponse } from 'axios';
import uuid from 'uuid';
// import Cookies from 'universal-cookie';

const redirectTilOpenAMLogin = () => {
    // TODO: fiks miljø
    const iTestmiljø = true;

    const randomId = uuid.v4().replace(/-/g, '');
    // console.log(randomId);
    if (iTestmiljø) {
        const redirectUrl = encodeURIComponent(
            'https://arbeidsgiver.nais.preprod.local/finn-kandidat/'
        );
        // TODO: sett expires
        // TODO: Test ut universal-cookie pakke om dette ikke fungerer
        // const cookie = `state_${randomId}=${redirectUrl}; domain=adeo.no; path=/veilarblogin/api/login; max-age=3600`;
        // const cookie = `state_${randomId}=${redirectUrl}; domain=nrk.no; path=/veilarblogin/api/login; max-age=3600`;
        // document.cookie = cookie;
        // const openAmUrl = `https://isso-q.adeo.no/isso/oauth2/authorize?session=winssochain&authIndexType=service&authIndexValue=winssochain&response_type=code&scope=openid&client_id=veilarblogin-q0&state=state_${randomId}&redirect_uri=https://app-q0.adeo.no/veilarblogin/api/login`;
        // window.location.href = openAmUrl;
        // console.log(cookie);
        // console.log(openAmUrl);
        //
        // const cookies = new Cookies();
        // TODO: Kan ikke sette annet domain enn det man er på?
        //  domene skal ikke ha leading .
        // cookies.set(`state_${randomId}`, redirectUrl, {
        //     domain: '.adeo.no',
        //     path: '/veilarblogin/api/login',
        //     maxAge: 3600,
        // });

        // path?: string;
        // expires?: Date;
        // maxAge?: number;
        // domain?: string;
        // secure?: boolean;
        // httpOnly?: boolean;
        // sameSite?: boolean | 'none' | 'lax' | 'strict';

        // console.log('cookies');
        // console.log(cookies.getAll());
        // console.log(document.cookie);

        // hvis man ikke kan bytte cookie domain må man kanskje redirecte til /start endepunktet som bare fins i testmiljø?
        window.location.href = 'https://app-q0.adeo.no/veilarblogin/api/start?url=' + redirectUrl;
    } else {
        // TODO: if (url inneholder noe greier) test ut
        const redirectUrl = encodeURIComponent('https://arbeidsgiver.nais.adeo.no/finn-kandidat/');
        document.cookie = `state_${randomId}=${redirectUrl}; domain=adeo.no; path=/veilarblogin/api/login; max-age=3600`;
        // TODO: Kan bruke Set-cookie på noe vis?
        window.location.href = `https://isso.adeo.no/isso/oauth2/authorize?session=winssochain&authIndexType=service&authIndexValue=winssochain&response_type=code&scope=openid&client_id=veilarblogin-p&state=state_${randomId}&redirect_uri=https://app.adeo.no/veilarblogin/api/login`;
    }
};

const api = axios.create({
    withCredentials: true,
    timeout: 30000,
});

api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('Fikk response: ', response);
        return response;
    },
    (error: AxiosError) => {
        console.log('feil i aktørregisterinterceptor. error:');
        console.log(error);
        console.log('error.message');
        console.log(error.message);
        console.log('error.code');
        console.log(error.code);
        console.log('error.config');
        console.log(error.config);
        console.log('error.request');
        console.log(error.request);
        console.log('error.name');
        console.log(error.name);
        console.log('error.response');
        console.log(error.response);
        console.log('-------------');
        console.log('-------------');

        // hvis 403
        if (error.response && error.response.status === 403) {
            console.log('error 403 fra aktørregister');
            console.log('redirecter til openam');
            redirectTilOpenAMLogin();
            // hvis cors feil. Typ 403 på pre flight kall
        } else if (!error.response) {
            console.log('cors feil?');
            console.log('error.message');
            console.log(error.message.toString());

            console.log('redirecter til openam');
            redirectTilOpenAMLogin();
            // hvis ikke
        } else {
            console.log('else promise reject');
            return Promise.reject(error);
        }

        // Angående å få vite om det er CORS feil eller ikke
        // https://github.com/axios/axios/issues/838
        // https://github.com/axios/axios/issues/383
        // Må kanskje håndtere feilmeldinger, og hvis ingenting funker vi må vi redirecte til OpenAM

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
