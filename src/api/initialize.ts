import axios from 'axios';
import { isDevelopment } from '../utils/environment';
import { APP_ROOT, AppRoute } from '../utils/paths';

const API_LOGIN = `${APP_ROOT}/redirect-til-login`;
const LOCAL_LOGIN = `http://localhost:8080/finn-kandidat-api/local/isso-login?redirect=http://localhost:3000${APP_ROOT}`;

const redirectToLogin = () => {
    window.location.href = isDevelopment() ? LOCAL_LOGIN : API_LOGIN;
};

const redirectToIngenTilgang = () => {
    window.location.href = `${APP_ROOT}${AppRoute.IngenTilgang}`;
};

const initializeApi = () => {
    const api = axios.create({
        baseURL: '/finn-kandidat-api',
        withCredentials: true,
        timeout: 30000,
    });

    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                redirectToLogin();
            } else if (error.response.status === 451) {
                redirectToIngenTilgang();
            } else {
                return Promise.reject(error);
            }
        }
    );

    return api;
};

const api = initializeApi();

export default api;
