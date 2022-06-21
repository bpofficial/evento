import { createContext, useContext } from 'react';
import { PageOptions } from '../types';
import { PagesProviderProps } from './usePages';

interface IPageContext extends PagesProviderProps {
    nextPage: () => void;
    previousPage: () => void;
    currentPage: PageOptions | null;
    inputs: Map<string, string>;
}

export const PagesContext = createContext<IPageContext>({
    pages: [],
    currentPage: null,
    nextPage() {
        //
    },
    previousPage() {
        //
    },
    inputs: new Map(),
});

export const usePages = () => {
    return useContext(PagesContext);
};
