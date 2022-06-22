import { Box, ChakraProvider } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { PagesProvider } from './components';
import { useCustomTheme } from './hooks';
import { Configuration } from './page-config';

export function App() {
    const theme = useCustomTheme();

    useEffect(() => {
        if (Configuration.Meta.title) {
            document.title = Configuration.Meta.title;
        }
    }, []);

    return (
        <ChakraProvider {...{ theme }}>
            <Formik initialValues={{}} onSubmit={console.log}>
                <Box h="100%" w="100vw">
                    <Box h="100%" p="8">
                        <PagesProvider
                            pages={Configuration.Pages}
                            calculations={Configuration.Calculations}
                        />
                    </Box>
                </Box>
            </Formik>
        </ChakraProvider>
    );
}

export default App;
