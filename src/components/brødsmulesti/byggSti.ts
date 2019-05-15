import { AppRoute, hentRoute } from '../../utils/paths';

interface Steg {
    navn: string;
    href: string;
    forrigeSteg?: AppRoute;
}

const byggSti = (route: AppRoute, fnr?: string) => {
    const alleSider = hentAlleSider(fnr);

    let detteSteget = alleSider[route];
    let sti = [detteSteget];

    while (detteSteget.forrigeSteg) {
        sti = [alleSider[detteSteget.forrigeSteg], ...sti];
        detteSteget = alleSider[detteSteget.forrigeSteg];
    }

    return sti;
};

type AlleSider = { [route in AppRoute]: Steg };

const hentAlleSider = (fødselsnummer?: string): AlleSider => ({
    [AppRoute.Forside]: {
        navn: 'Forside',
        href: AppRoute.Forside,
    },

    [AppRoute.Oversikt]: {
        navn: 'Oversikt',
        href: AppRoute.Oversikt,
        forrigeSteg: AppRoute.Forside,
    },

    [AppRoute.SeKandidat]: {
        navn: 'Kandidat',
        href: hentRoute(AppRoute.SeKandidat, fødselsnummer),
        forrigeSteg: AppRoute.Oversikt,
    },

    [AppRoute.EndreKandidat]: {
        navn: 'Endre kandidat',
        href: hentRoute(AppRoute.EndreKandidat, fødselsnummer),
        forrigeSteg: AppRoute.Oversikt,
    },

    [AppRoute.Registrering]: {
        navn: 'Ny kandidat',
        href: hentRoute(AppRoute.Registrering, fødselsnummer),
        forrigeSteg: AppRoute.Oversikt,
    },

    [AppRoute.FørDuBegynner]: {
        navn: 'Registrer eller endre kandidat',
        href: AppRoute.FørDuBegynner,
        forrigeSteg: AppRoute.Oversikt,
    },
});

export default byggSti;
