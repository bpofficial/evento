import { Box, ChakraProvider } from '@chakra-ui/react';
import { Formik } from 'formik';
import { PagesProvider } from './components';
import {
    EnvironmentContext,
    IEnvironmentContext,
    ModelProvider,
    useCustomTheme,
} from './hooks';
import { FormModel } from '@evento/models';
import { RootComponentHelmetData } from './types';

export interface AppProps {
    configuration: ReturnType<FormModel['toJSON']>;
    environment: IEnvironmentContext;
}

export function EventoApp({
    configuration,
    environment,
}: AppProps & RootComponentHelmetData) {
    const theme = useCustomTheme();

    return (
        <EnvironmentContext.Provider value={environment}>
            <ChakraProvider {...{ theme }}>
                <Formik initialValues={{}} onSubmit={console.log}>
                    <Box h="100%" w="100vw">
                        <Box h="100%" p="8">
                            <ModelProvider model={configuration}>
                                <PagesProvider />
                            </ModelProvider>
                        </Box>
                    </Box>
                </Formik>
            </ChakraProvider>
        </EnvironmentContext.Provider>
    );
}
