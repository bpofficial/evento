import { Box, HStack } from '@chakra-ui/react';
import { BsArrowLeft } from 'react-icons/bs';
import { usePages } from '../../hooks/pageContext';

export const BackButton = () => {
    const {
        pageState: { state, actions },
    } = usePages();

    return !state.isFirstPage ? (
        <HStack mb="2" onClick={actions.previousPage}>
            <BsArrowLeft />
            <Box fontWeight="600">Back</Box>
        </HStack>
    ) : null;
};
