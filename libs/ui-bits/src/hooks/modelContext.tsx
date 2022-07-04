import { createContext, useContext } from 'react';
import { FormModel } from '@evento/models';

export const ModelContext = createContext<FormModel>(new FormModel());

export const useModel = () => {
    return useContext(ModelContext);
};

interface ModelProviderProps {
    model: ReturnType<FormModel['toJSON']>;
}

export const ModelProvider: React.FC<
    React.PropsWithChildren<ModelProviderProps>
> = ({ children, model }) => {
    return (
        <ModelContext.Provider value={FormModel.fromJSON(model)}>
            {children}
        </ModelContext.Provider>
    );
};
