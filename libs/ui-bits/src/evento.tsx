import {Box, ChakraProvider} from '@chakra-ui/react';
import {Formik} from 'formik';
import {PagesProvider} from './components';
import {EnvironmentContext, IEnvironmentContext, useCustomTheme} from './hooks';
import {PageModel} from "@evento/models";
import {RootComponentHelmetData} from "./types";

interface AppProps {
    configuration: PageModel
    environment: IEnvironmentContext
}

export function EventoApp({configuration, environment, helmet}: AppProps & RootComponentHelmetData) {
    const theme = useCustomTheme();

    if (!configuration.pages) return null;
    if (!configuration.formId) return null;

    return (
        // <HelmetProvider context={helmet}>
        //     <Helmet>
        <EnvironmentContext.Provider value={environment}>
            <ChakraProvider {...{theme}}>
                <Formik initialValues={{}} onSubmit={console.log}>
                    <Box h="100%" w="100vw">
                        <Box h="100%" p="8">
                            <PagesProvider
                                formId={configuration.formId}
                                pages={configuration.pages as any}
                                calculations={configuration?.calculations ?? {}}
                            />
                        </Box>
                    </Box>
                </Formik>
            </ChakraProvider>
        </EnvironmentContext.Provider>
        //     </Helmet>
        // </HelmetProvider>
    );
}
