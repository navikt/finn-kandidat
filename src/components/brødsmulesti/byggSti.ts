import { AppRoute, hentRoute } from '../../utils/paths';

interface Steg {
    navn: string;
    href: string;
    forrigeSteg?: Brødsmuleside;
}

export type Brødsmuleside = Exclude<AppRoute, AppRoute.IngenTilgang>;

const byggSti = (route: Brødsmuleside, aktørId?: string) => {
    const alleSider = hentAlleSider(aktørId);

    let detteSteget = alleSider[route];
    let sti = [detteSteget];

    while (detteSteget.forrigeSteg) {
        sti = [alleSider[detteSteget.forrigeSteg], ...sti];
        detteSteget = alleSider[detteSteget.forrigeSteg];
    }

    return sti;
};

type AlleSider = { [route in Brødsmuleside]: Steg };

const hentAlleSider = (aktørId?: string): AlleSider => ({
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
        href: hentRoute(AppRoute.SeKandidat, aktørId),
        forrigeSteg: AppRoute.Oversikt,
    },

    [AppRoute.EndreKandidat]: {
        navn: 'Endre kandidat',
        href: hentRoute(AppRoute.EndreKandidat, aktørId),
        forrigeSteg: AppRoute.Oversikt,
    },

    [AppRoute.Registrering]: {
        navn: 'Ny kandidat',
        href: hentRoute(AppRoute.Registrering, aktørId),
        forrigeSteg: AppRoute.Oversikt,
    },

    [AppRoute.FørDuBegynner]: {
        navn: 'Registrer eller endre kandidat',
        href: AppRoute.FørDuBegynner,
        forrigeSteg: AppRoute.Oversikt,
    },
});

export default byggSti;
