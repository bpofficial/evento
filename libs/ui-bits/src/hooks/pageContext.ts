import {createContext, useContext} from 'react';
import {PagesProviderProps} from '../components';
import {PageOptions} from '../types';
import {PagesState} from './usePagesState';
import {AxiosResponse} from "axios";

interface IPageContext extends Omit<PagesProviderProps, 'formId'> {
    pages: PageOptions[];
    inputs: Map<string, string>;
    pageState: PagesState;
    submitFn: () => Promise<AxiosResponse>;
}

export const PagesContext = createContext<IPageContext>({
    pages: [],
    inputs: new Map(),
    calculations: {},
    pageState: {} as any,
    submitFn: (() => {
        //
    }) as any
});

export const usePages = () => {
    return useContext(PagesContext);
};
