import { createContext, useContext } from 'react';
import { PageOptions } from '../types';
import { PagesProviderProps } from './usePages';

interface IPageContext extends PagesProviderProps {
    nextPage: () => void;
    previousPage: () => void;
    currentPage: PageOptions | null;
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
});

export const usePages = () => {
    return useContext(PagesContext);
};
