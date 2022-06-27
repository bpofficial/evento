import { Box, ChakraProvider } from '@chakra-ui/react';
import { Formik } from 'formik';
import { PagesProvider } from './components';
import {
    EnvironmentContext,
    IEnvironmentContext,
    useCustomTheme,
} from './hooks';
import { PageModel } from '@evento/models';
import { RootComponentHelmetData } from './types';

export interface AppProps {
    configuration: Pick<
        PageModel,
        'formId' | 'calculations' | 'meta' | 'pages'
    >;
    environment: IEnvironmentContext;
}

export function EventoApp({
    configuration,
    environment,
    helmet,
}: AppProps & RootComponentHelmetData) {
    const theme = useCustomTheme();

    return (
        <EnvironmentContext.Provider value={environment}>
            <ChakraProvider {...{ theme }}>
                <Formik initialValues={{}} onSubmit={console.log}>
                    <Box h="100%" w="100vw">
                        <Box h="100%" p="8">
                            <PagesProvider {...{ configuration }} />
                        </Box>
                    </Box>
                </Formik>
            </ChakraProvider>
        </EnvironmentContext.Provider>
    );
}
