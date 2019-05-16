import Språk from '../types/Språk';

const sistEndretFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

export const formaterDato = (dato: Date) => dato.toLocaleDateString(Språk.Bokmål, sistEndretFormat);

export const formaterDatoOgTid = (dato: Date) =>
    dato.toLocaleTimeString(Språk.Bokmål, sistEndretFormat);
