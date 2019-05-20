# Finn kandidat

## Installasjon

```
yarn
```

## Utvikling

```
yarn start
```

Med mocket API:

```
yarn mock
```

## Regler

### Vektorgrafikk

Vi skiller på *ikoner* og *illustrasjoner* i måten vi oppbevarer og bruker vektorgrafikk.

#### Illustrasjoner

*Illustrasjoner* består av flere farger og ofte flere grafiske elementer. Vi pleier å komprimere disse med [svgo](https://github.com/svg/svgo), som kan gjøres manuelt via kommandolinjeverktøyet (på npm/brew) eller [her](https://jakearchibald.github.io/svgomg/). Bruk lavest mulig `precision` uten at kvaliteten reduseres nevneverdig.

Lagre ikonet som en `.svg` der det brukes i koden og bruk det i en `img`-tag, slik:

```jsx
import ikon from './ikon.svg';

const KomponentMedIkon = () => (
    <img src={ikon} alt="Beskrivelse av ikon" />
);
```

#### Ikoner

*Ikoner* er ensfargede vektorfiler. De kan komprimeres som illustrasjoner og brukes i en `img`-tag, men da kan det være vanskelig å style dem i appen. Alternativt kan de derfor importeres og brukes som React-komponenter slik at de rendres inline i DOM-en:

```jsx
import { ReactComponent as Ikon } from './ikon.svg';

const KomponentMedIkon = () => (
    <Ikon />
);
```

Hvis du bruker ikoner på denne måten bør du huske å legge til et beskrivende `<title>`-element i `<svg>`-tagen for universell utforming. Inline-ikoner kan styles i CSS/LESS, slik:

```less
svg {
    color: red;

    &:hover {
        color: white;
    }
}
```

## Opprett mockdata

`src/mocking/kandidater.json` inneholder kandidatene som brukes under mocking. Disse kan regenereres med scriptet under `src/mocking/skapKandidater.ts`. Legg til linjen `console.log(skapKandidater(n));` i `App.tsx`, der *n* er antall kandidater du vil generere. Kjør appen med `yarn mock`, gå til browserkonsollen, kopier log-outputtet og lim det inn i `kandidater.json`. I Chrome kan du kopiere kandidatene ved å høyreklikke, trykke *Store as global variable*, så kjøre `copy(temp1)`.
