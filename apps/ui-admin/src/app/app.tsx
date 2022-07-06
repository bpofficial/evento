import { ChakraProvider } from '@chakra-ui/react';
import styled from '@emotion/styled';

const StyledApp = styled.div`
    // Your style here
`;

export function App() {
    return (
        <StyledApp>

<ChakraProvider></ChakraProvider>
        </StyledApp>
    );
}

export default App;
