export const isDevelopment = () => process.env.NODE_ENV === 'development';

const environment = () => {
    return {
        AKTORREGISTER_URL: (window as any).appSettings.AKTORREGISTER_URL,
    };
};

export default environment();
