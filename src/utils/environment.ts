export const isDevelopment = () => process.env.NODE_ENV === 'development';

const environment = () => {
    return {
        AKTØRREGISTER_URL: (window as any).appSettings.AKTØRREGISTER_URL,
    };
};

export default environment();
