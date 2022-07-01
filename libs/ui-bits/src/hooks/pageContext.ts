import { createContext, useContext } from 'react';

import { PageOptions } from '../types';
import { AxiosResponse } from 'axios';
import { PageState } from './usePagesState';
import { FormModel } from '@evento/models';

interface IPageContext {
    pages: PageOptions[];
    calculations: FormModel['calculations'];
    validations: FormModel['validations'];
    inputs: Map<string, string>;
    pageState: PageState;
    submitFn: () => Promise<AxiosResponse>;
    formId: string;
    version: number;
}

export const PagesContext = createContext<IPageContext>({
    pages: [],
    inputs: new Map(),
    calculations: {},
    validations: {},
    pageState: {} as any,
    submitFn: (() => {
        //
    }) as any,
    formId: '',
    version: 0,
});

export const usePages = () => {
    return useContext(PagesContext);
};
