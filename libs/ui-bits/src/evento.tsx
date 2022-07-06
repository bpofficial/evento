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
import { polyfill } from 'interweave-ssr';
import useSSR from 'use-ssr';

export interface AppProps {
    configuration: ReturnType<FormModel['toJSON']>;
    environment?: IEnvironmentContext;
    preview: boolean;
}

export function EventoApp({
    configuration,
    environment,
    preview = false,
}: AppProps & RootComponentHelmetData) {
    const theme = useCustomTheme();

    const { isServer } = useSSR();
    if (isServer) polyfill();

    return (
        <EnvironmentContext.Provider value={environment ?? {}}>
            <ChakraProvider {...{ theme }}>
                <Formik initialValues={{}} onSubmit={console.log}>
                    <Box h="100%" w={preview ? '100%' : '100vw'}>
                        <Box h="100%" p="8">
                            <ModelProvider model={configuration}>
                                <PagesProvider {...{ preview }} />
                            </ModelProvider>
                        </Box>
                    </Box>
                </Formik>
            </ChakraProvider>
        </EnvironmentContext.Provider>
    );
}
