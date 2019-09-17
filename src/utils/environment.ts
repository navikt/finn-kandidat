export const isDevelopment = () => process.env.NODE_ENV === 'development';
export const isTest = () => process.env.NODE_ENV === 'test';

const environment = () => {
    if (isDevelopment() || isTest() || process.env.REACT_APP_MOCK) {
        return { AKTORREGISTER_URL: 'localhost:8081/aktoerregister/api/v1' };
    } else {
        const appSettings = (window as any).appSettings;
        return { AKTORREGISTER_URL: appSettings.AKTORREGISTER_URL };
    }
};

export default environment();
