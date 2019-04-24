import FysiskTilrettelegging from './FysiskTilrettelegging';
import Arbeidssituasjon from './Arbeidssituasjon';

interface Kandidat {
    fnr: string;
    arbeidssituasjon: Arbeidssituasjon;
    fysiskTilrettelegging: FysiskTilrettelegging[];
    sistEndret: Date;
    sistEndretAv: string;
}

export default Kandidat;
