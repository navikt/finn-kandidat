import axios, { AxiosError, AxiosResponse } from 'axios';
import uuid from 'uuid';
import Cookies from 'universal-cookie';

const redirectTilOpenAMLogin = () => {
    // TODO: fiks miljø
    const iTestmiljø = true;

    const randomId = uuid.v4().replace(/-/g, '');
    if (iTestmiljø) {
        const redirectUrl = encodeURIComponent(
            'https://arbeidsgiver.nais.preprod.local/finn-kandidat/'
        );
        // TODO: sett expires
        // TODO: Test ut universal-cookie pakke om dette ikke fungerer
        const cookie = `state_${randomId}=${redirectUrl}; domain=.adeo.no; path=/veilarblogin/api/login; max-age=3600`;
        // document.cookie = cookie;
        const openAmUrl = `https://isso-q.adeo.no/isso/oauth2/authorize?session=winssochain&authIndexType=service&authIndexValue=winssochain&response_type=code&scope=openid&client_id=veilarblogin-q0&state=state_${randomId}&redirect_uri=https://app-q0.adeo.no/veilarblogin/api/login`;
        console.log(cookie);
        console.log(openAmUrl);

        const cookies = new Cookies();
        cookies.set(`state_${randomId}`, redirectUrl, {
            domain: '.adeo.no',
            path: '/veilarblogin/api/login',
            maxAge: 3600,
        });

        // path?: string;
        // expires?: Date;
        // maxAge?: number;
        // domain?: string;
        // secure?: boolean;
        // httpOnly?: boolean;
        // sameSite?: boolean | 'none' | 'lax' | 'strict';

        console.log('cookies');
        console.log(cookies.getAll());
        console.log(document.cookie);

        window.location.href = openAmUrl;
    } else {
        const redirectUrl = encodeURIComponent('https://arbeidsgiver.nais.adeo.no/finn-kandidat/');
        document.cookie = `state_${randomId}=${redirectUrl}; domain=.adeo.no; path=/veilarblogin/api/login; max-age=3600`;
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
        // console.log('feil i aktørregisterinterceptor. error:');
        // console.log(error);
        // console.log('error.message');
        // console.log(error.message);
        // console.log('error.code');
        // console.log(error.code);
        // console.log('error.config');
        // console.log(error.config);
        // console.log('error.isAxiosError');
        // console.log(error.isAxiosError);
        // console.log('error.request');
        // console.log(error.request);
        // console.log('error.name');
        // console.log(error.name);

        console.log('redirecter til openam');
        redirectTilOpenAMLogin();

        return Promise.reject(error);

        // Angående å få vite om det er CORS feil eller ikke
        // https://github.com/axios/axios/issues/838
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
