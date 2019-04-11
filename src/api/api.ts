const BASE_URL = '/finn-kandidat-api';
const HELLO_WORLD_URL = `${BASE_URL}/hello-world`;

export const hentHelloWorld = async (): Promise<string> => {
    const respons = await fetch(HELLO_WORLD_URL);
    if (respons.ok) {
        return await respons.text();
    } else {
        return 'Feil fra backend';
    }
};
