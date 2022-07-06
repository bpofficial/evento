import { createContext, useContext } from 'react';
import { AxiosResponse } from 'axios';
import { PageState } from './usePagesState';

interface IPageContext {
    inputs: Map<string, string>;
    pageState: PageState;
    submitFn: () => Promise<AxiosResponse>;
    preview: boolean
}

export const PagesContext = createContext<IPageContext>({
    inputs: new Map(),
    pageState: {} as any,
    submitFn: (() => {
        //
    }) as any,
    preview: false
});

export const usePages = () => {
    return useContext(PagesContext);
};
