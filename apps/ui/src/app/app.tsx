import { Box, ChakraProvider } from '@chakra-ui/react';
import { PagesProvider, useCustomTheme } from './hooks';
import { Pages } from './page-config';

export function App() {
    const theme = useCustomTheme();
    return (
        <ChakraProvider {...{ theme }}>
            <Box h="100vh" w="100vw">
                <Box h="100%" p="8">
                    <PagesProvider pages={Pages} />
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;
// bg="#E9F1F7"
