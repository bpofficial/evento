import { Box, ChakraProvider } from '@chakra-ui/react';
import { useCustomTheme } from './hooks';
import { MultiVote } from './screens/MultiVote';

export function App() {
    const theme = useCustomTheme();
    return (
        <ChakraProvider {...{ theme }}>
            <Box h="100vh" w="100vw">
                <Box h="100%" p="8">
                    <MultiVote />
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;
// bg="#E9F1F7"
