import { createContext, useContext } from 'react';

import { PageOptions } from '../types';
import { AxiosResponse } from 'axios';
import { PageState } from './usePagesState';

interface IPageContext {
    pages: PageOptions[];
    calculations: Record<string, any>;
    inputs: Map<string, string>;
    pageState: PageState;
    submitFn: () => Promise<AxiosResponse>;
}

export const PagesContext = createContext<IPageContext>({
    pages: [],
    inputs: new Map(),
    calculations: {},
    pageState: {} as any,
    submitFn: (() => {
        //
    }) as any,
});

export const usePages = () => {
    return useContext(PagesContext);
};
