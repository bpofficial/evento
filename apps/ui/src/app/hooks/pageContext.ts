import { createContext, useContext } from 'react';
import { PagesProviderProps } from '../components/Pages';
import { PageOptions } from '../types';
import { PagesState } from './usePagesState';

interface IPageContext extends PagesProviderProps {
    pages: PageOptions[];
    inputs: Map<string, string>;
    pageState: PagesState;
}

export const PagesContext = createContext<IPageContext>({
    pages: [],
    inputs: new Map(),
    calculations: {},
    pageState: {} as any,
});

export const usePages = () => {
    return useContext(PagesContext);
};
