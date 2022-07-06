import {createContext, useContext} from "react";

export interface IEnvironmentContext {
    api?: {
        baseUrl?: string;
    }
}

export const EnvironmentContext = createContext<IEnvironmentContext>({
    api: {
        baseUrl: ''
    }
})

export const useEnvironment = () => {
    return useContext(EnvironmentContext);
}
