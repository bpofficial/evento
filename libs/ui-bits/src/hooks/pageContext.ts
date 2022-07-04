import { createContext, useContext } from 'react';
import { AxiosResponse } from 'axios';
import { PageState } from './usePagesState';

interface IPageContext {
    inputs: Map<string, string>;
    pageState: PageState;
    submitFn: () => Promise<AxiosResponse>;
}

export const PagesContext = createContext<IPageContext>({
    inputs: new Map(),
    pageState: {} as any,
    submitFn: (() => {
        //
    }) as any,
});

export const usePages = () => {
    return useContext(PagesContext);
};
