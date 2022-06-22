import { Box, ChakraProvider } from '@chakra-ui/react';
import { PagesProvider } from './components';
import { useCustomTheme } from './hooks';
import { Configuration } from './page-config';

export function App() {
    const theme = useCustomTheme();
    return (
        <ChakraProvider {...{ theme }}>
            <Box h="100%" w="100vw">
                <Box h="100%" p="8">
                    <PagesProvider
                        pages={Configuration.Pages}
                        calculations={Configuration.Calculations}
                    />
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;
// bg="#E9F1F7"
