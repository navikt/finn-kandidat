import React, { createContext, FunctionComponent, useContext, useState } from 'react';
import { ValgteKriterier } from '../Filtrering';

type FilterState = ValgteKriterier | undefined;
type ContextType = [FilterState, (filter?: FilterState) => void];

const FilterContext = createContext<ContextType>([] as any);

export const FilterContextProvider: FunctionComponent = ({ children }) => {
    const filterState = useState<FilterState>(undefined);

    return <FilterContext.Provider value={filterState}>{children}</FilterContext.Provider>;
};

export const useFilterContext = () => useContext(FilterContext);
